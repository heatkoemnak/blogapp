import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { country } = await request.json();

    if (!city) {
      return new Response('City is required', { status: 400 });
    }
    const jobLocation = await prisma.jobLocation.create({
      data: {
        country,
      },
    });

    return NextResponse.json(jobLocation, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const jobLocation = await prisma.jobLocation.findMany({
      include: {
        ProvinceCity: true,
        jobs: true,
      },
    });

    return NextResponse.json(jobLocation, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
