import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const announcement = await prisma.announcement.findMany({});
    if (!announcement) {
      throw new Error('Post not found .');
    }
    return NextResponse.json(announcement, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
