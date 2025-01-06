import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return new Response('Name is required', { status: 400 });
    }
    const jobIndustry = await prisma.jobIndustry.create({
      data: {
        name,
      },
    });

    return NextResponse.json(jobIndustry, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const announcement = await prisma.announcement.findMany({});

    return NextResponse.json(announcement, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
