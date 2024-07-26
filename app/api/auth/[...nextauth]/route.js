import { connectMongoDB } from '@/libs/mongodb';
import User from '@/models/user';
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import GithubProviders from 'next-auth/providers/github';
import GoogleProviders from 'next-auth/providers/google';
import CredentialsProviders from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/libs/prismadb';
import { createUserWithAccount, getUserByEmail } from '@/app/utils/user';

// Validation schema for credentials

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProviders({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProviders({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await getUserByEmail(credentials.email);
          if (!user) {
            return Promise.reject(new Error('No user found with this email.'));
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            return Promise.reject(new Error('Incorrect password.'));
          }
          return user;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to login user');
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      console.log(user, account);
      if (account.provider === 'credentials') {
        return true;
      }
      if (account.provider === 'google' ) {
        const { email, name} = user;
        try {
          const userExists = await getUserByEmail(email);
          if (!userExists) {
            const res = await fetch('http://localhost:3000/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email,image }),
            });
            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (account.provider === 'github') {
        const { email, name, image } = user;
        try {
          
          const userExists = await getUserByEmail(email);
          
          if (!userExists) {
            const res = await fetch('http://localhost:3000/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email,image }),
            });
            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    singIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DATABASE_URL,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
