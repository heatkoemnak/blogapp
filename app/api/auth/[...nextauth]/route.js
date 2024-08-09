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

// Validation schema for credentials (not provided in the code snippet)
// Consider using a validation library like Joi or Yup

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

      if (account.provider === 'credentials') {
        return true;
      }

      if (['google', 'github'].includes(account.provider)) {
        const { email, name, image } = user;
        try {
          const userExists = await getUserByEmail(email);
          if (!userExists) {
            const res = await fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, image }),
            });
            if (res.ok) {
              return true;
            } else {
              throw new Error('Failed to register user via OAuth');
            }
          }
        } catch (error) {
          console.error('Error during OAuth sign-in:', error);
          return false;
        }
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DATABASE_URL,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
