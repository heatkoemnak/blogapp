import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  console.log(id);

  try {
    const companies = await prisma.company.findMany({
      where: { userID: id },
      include: {
        Job: true,
      },
    });
    if (!companies) {
      return NextResponse.json({ message: 'No companies found for this user' });
    }
    console.log(companies);
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { name, industry, contactNumber, email, website, logoUrl } =
      await request.json();

    const newUpdate = await prisma.company.update({
      where: { id: id },
      data: {
        name,
        industry,
        contactNumber,
        email,
        website,
        logoUrl,
      },
    });
    return NextResponse.json(newUpdate, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.company.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: 'Company deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
