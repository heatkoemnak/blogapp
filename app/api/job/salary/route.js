import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { minSalary, maxSalary, label } = await request.json();

    if (!label || !minSalary || !maxSalary) {
      return new Response('All fields are required', { status: 400 });
    }
    const jobSalary = await prisma.jobSalary.create({
      data: {
        minSalary,
        maxSalary,
        label,
      },
    });

    return NextResponse.json(jobSalary, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const jobSalary = await prisma.jobSalary.findMany({});

    return NextResponse.json(jobSalary, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
