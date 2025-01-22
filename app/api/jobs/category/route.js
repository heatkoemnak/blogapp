import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { name,jobIndustryId } = await request.json();

    if (!name) {
      return new Response('Name is required', { status: 400 });
    }
    const jobCategory = await prisma.jobCategory.create({
      data: {
        name,
        jobIndustryId

      },
    });

    return NextResponse.json(jobCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const jobCategory = await prisma.jobCategory.findMany({});

    return NextResponse.json(jobCategory, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
