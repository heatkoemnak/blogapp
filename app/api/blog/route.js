import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const {
      title,
      body,
      image,
      public_id,
      authorEmail,
      categoryId,
      links,
      publishedAt,
    } = await request.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        body,
        image,
        public_id,
        authorEmail,
        categoryId,
        links,
        publishedAt,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  const { searchParams } = new URL(req.url); // Extract query parameters from request
  const searchTerm = searchParams.get('q');
  console.log(searchTerm);

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm || '', // Search in title
              mode: 'insensitive', // Case insensitive
            },
          },
          {
            body: {
              contains: searchTerm || '', // Search in content
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        author: true,
        category: true,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
