import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/libs/prismadb';
import { createUserWithAccount, getUserByEmail } from '@/app/utils/user';

const authOptions = {
  adapter: PrismaAdapter(prisma), // For handling user and account models
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Retrieve the user by email
          const user = await getUserByEmail(credentials.email);
          if (!user) {
            throw new Error('No user found with this email.');
          }

          // Verify the password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error('Incorrect password.');
          }
          return user; // Successful login
        } catch (error) {
          console.error('Error during credentials login:', error.message);
          throw new Error('Login failed. Please check your credentials.');
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (account.provider === 'credentials') {
        return true; // Allow credentials-based login
      }
      // Handle Google login
      const { email, name, image } = user;

      if (!existingUser) {
        // If the user doesn't exist, create a new user
        const hashedPassword = await bcrypt.hash(new Date().toISOString(), 10);
        await createUserWithAccount({
          name,
          email,
          image,
          password: hashedPassword,
        });
      }

      if (account.provider === 'google') {
        console.log(existingUser);

        if (existingUser) {
          // If the user doesn't exist, create a new user
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });
        }

        return true; // Allow Google login
      }

      if (account.provider === 'facebook') {
        if (existingUser) {
          // If the user doesn't exist, create a new user
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });
        }

        return true; // Allow Facebook login
      }
    },

    async session({ session, token }) {
      if (token) {
        console.log(token);
        session.user.id = token.sub; // Attach user ID to the session
      }
      console.log(session);
      return session;
    },

    // async jwt({ token, user }) {
    //   if (user) {
    //     token.sub = user.id; // Attach user ID to the JWT token
    //   }
    //   return token;
    // },
  },

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
    error: '/auth/error', // Optional custom error page
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
