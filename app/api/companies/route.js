import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        Job: true,
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
  const { name, industry, contactNumber, email, website, logoUrl, userID } =
    await request.json();
  if (!name || !industry || !contactNumber || !email || !userID) {
    return NextResponse.json({ message: 'Missing required fields' });
  }
  try {
    const newCompany = await prisma.company.create({
      data: {
        name,
        industry,
        contactNumber,
        email,
        website,
        logoUrl,
        userID,
      },
    });

    return NextResponse.json(
      newCompany,
      { message: 'Post created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    console.error(error);
    throw new Error('Failed to create the post with associated categories');
  }
}
