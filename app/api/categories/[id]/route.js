import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  // const { searchParams } = new URL(req.url);
  // const name = searchParams.get('name'); // Extract the 'name' query parameter
  // console.log(name)
  try {
    // Fetch the category from the database using Prisma
    const category = await prisma.category.findUnique({
      where: { id: id },
      include: {
        posts: {
          include: {
            author: true,
            categories: true,
            comments: {
              include: {
                author: true,
                replies: {
                  include: {
                    author: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
