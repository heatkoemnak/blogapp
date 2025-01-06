import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return new Response('Name is required', { status: 400 });
    }
    const jobType = await prisma.jobType.create({
      data: {
        name,
      },
    });

    return NextResponse.json(jobType, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const jobType = await prisma.jobType.findMany({});

    return NextResponse.json(jobType, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
