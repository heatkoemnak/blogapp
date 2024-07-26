
// import prisma from '@/libs/prismadb';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'No data found' }, { status: 500 });
  }
}
