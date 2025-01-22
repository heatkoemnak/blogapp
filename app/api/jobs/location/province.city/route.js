import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return new Response('Name is required', { status: 400 });
    }
    const provinceCity = await prisma.provinceCity.create({
      data: {
        name,
      },
    });

    return NextResponse.json(provinceCity, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const provinceCity = await prisma.provinceCity.findMany({
      include: {
        districts: true,
      },
    });

    return NextResponse.json(provinceCity, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
