import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const [countries, state,districts,communes] = await Promise.all([
      prisma.jobLocation.findMany(),
      prisma.provinceCity.findMany(),
      prisma.districts.findMany(),
      prisma.communes.findMany(),
    ]);
    return NextResponse.json({ countries, state,districts,communes });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' });
  }
}
