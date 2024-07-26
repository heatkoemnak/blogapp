import prisma from '@/libs/prismadb';
// import { v4 as uuidv4 } from 'uuid';

export async function createUserWithAccount({ name, email, password }) {
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
        // accounts: {
        //   create: {
        //     type: 'credentials',
        //     provider: 'credentials',
        //     providerAccountId: uuidv4(),
        //   },
        // },
      },
      // include:{
      //   accounts:true
      // }
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
    });
    return user;
  } catch (error) {
    console.log('Error getting user with email', error);
    throw error;
  }
}
