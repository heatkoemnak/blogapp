import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        Job: true,
        User: true,
      },
    });

    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch jobs', error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  const { companies } =
    await request.json()
  try {
    const newCompany = await prisma.company.createMany({
      data: companies,
    });

    return NextResponse.json(
      newCompany,
      { message: 'Post created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create the post with associated categories');
  }
}
