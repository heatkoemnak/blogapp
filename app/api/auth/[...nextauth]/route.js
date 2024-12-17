import foo from 'module';
import User from '@/models/user';
import NextAuth from 'next-auth/next';
import bcrypt from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/libs/prismadb';
import { getUserByEmail } from '@/app/utils/user';

// Validation schema for credentials (not provided in the code snippet)
// Consider using a validation library like Joi or Yup

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
          const user = await getUserByEmail(credentials.email);
          if (!user) {
            throw new Error('No user found with this email.');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error('Incorrect password.');
          }
          return user;
        } catch (error) {
          console.error('Error during user authorization:', error);
          throw new Error('Failed to login user');
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      console.log('User:', user);
      console.log('Account:', account);

      // Allow credentials provider users to sign in
      if (account.provider === 'credentials') {
        return true;
      }

      // OAuth Providers (Google, GitHub, Facebook)
      if (['google', 'github', 'facebook'].includes(account.provider)) {
        const { email, name, image } = user;

        // Ensure email exists (OAuth edge case)
        if (!email) {
          console.error('Error: OAuth provider did not return an email.');
          return false;
        }

        try {
          // Check if user already exists in DB
          const userExists = await getUserByEmail(email);
          if (!userExists) {
            // If user doesn't exist, register them
            const response = await fetch('/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, image }),
            });

            if (!response.ok) {
              console.error('Error: Failed to register new OAuth user.');
              return false;
            }
          }
        } catch (error) {
          console.error('Error during OAuth sign-in:', error.message || error);
          return false;
        }
        return true; // Allow sign-in
      }
      return false; // Deny sign-in if other unknown providers
    },

    // Add user ID to the session object
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
