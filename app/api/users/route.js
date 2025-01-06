import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany({});
    if (!users) {
      return NextResponse.json(
        { message: 'No user created.' },
        { status: 500 }
      );
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
