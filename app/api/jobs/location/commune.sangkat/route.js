import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { name, districtId } = await request.json();

    if (!name) {
      return new Response('Name is required', { status: 400 });
    }
    const communes = await prisma.communes.create({
      data: {
        name,
        districtId,
      },
    });

    return NextResponse.json(communes, { status: 201 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}

export async function GET() {
  try {
    const communes = await prisma.communes.findMany({});

    return NextResponse.json(communes, { status: 200 });
  } catch (error) {
    console.error('Error creating JobIndustry:', error);
    return new Response('Failed to create JobIndustry', { status: 500 });
  }
}
