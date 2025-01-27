import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { name, level } = await request.json();

    if (!name || !level) {
      return new Response('Name and level are required', { status: 400 });
    }
    const jobLevel = await prisma.jobLevel.create({
      data: {
        name,
        level,
      },
    });

    return NextResponse.json(jobLevel, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const jobLevel = await prisma.jobLevel.findMany({
      include: {
        jobs: true,
      },
    });

    return NextResponse.json(jobLevel, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
