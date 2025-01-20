import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const {
    name,
    industry,
    contactNumber,
    email,
    website,
    logoUrl,
    userID,
  } = await request.json();
  if (
    !name ||
    !industry ||
    !contactNumber ||
    !email ||
    !headquarters ||
    !userID
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const newCompany = await prisma.job.create({
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
    console.error(error);
    throw new Error('Failed to create the post with associated categories');
  }
}
