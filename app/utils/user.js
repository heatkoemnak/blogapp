import prisma from '@/libs/prismadb';
import { v4 as uuidv4 } from 'uuid';

export async function createUserWithAccount({ name, email,role, password }) {
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        role,
        password,
      },
    });
  } catch (error) {
    console.log('Error creating user', error);
    throw error;
  }
}
export async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: true,
      },
    });
    return user;
  } catch (error) {
    console.log('Error getting user with email', error);
    throw error;
  }
}
