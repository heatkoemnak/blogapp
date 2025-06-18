import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  console.log(id);

  try {
    const company = await prisma.company.findFirst({
      where: { id: id },
    });
    if (!company) {
      return NextResponse.json({ message: 'No company found for this user' });
    }
    console.log(company);
    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
