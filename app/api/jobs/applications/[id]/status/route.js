// pages/api/applications/[id]/status.ts
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  const { id } = params;
  const { status, body } = await req.json();
  console.log(id, status, body);

  if (!id) {
    return NextResponse.json({ message: 'Application ID is required' }, { status: 400 });
  }

  if (!status) {
    return NextResponse.json({ message: 'Status is required' }, { status: 400 });
  }

  try {
    const updated = await prisma.Application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update status' }, { status: 500 });
  }
}
