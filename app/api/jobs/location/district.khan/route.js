import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { name, provinceCityId } = await request.json();

    if (!name) {
      return new Response('Name is required', { status: 400 });
    }
    const districts = await prisma.districts.create({
      data: {
        name,
        provinceCityId,
      },
    });

    return NextResponse.json(districts, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const districts = await prisma.districts.findMany({
      include: {
        communes: true,
      },
    });

    return NextResponse.json(districts, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
