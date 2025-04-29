import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const {
      Fullname,
      applicationFor,
      email,
      about,
      attachment,
      userID,
      jobID,
    } = await request.json();

    const application = await prisma.Application.create({
      data: {
        Fullname,
        applicationFor,
        email,
        about,
        attachment,
        userID,
        jobID,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return new Response('Failed to create Applkcation', { status: 500 });
  }
}
