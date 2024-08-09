import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { title, body, image,public_id, authorEmail, categoryId, links, publishedAt } =
      await request.json();

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
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id:true,
            name: true,
            image: true,
            email:true
          },
        },
        category: true,
        comments: {
          include: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
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
    if (!posts) {
      throw new Error('Post not found .');
    }
    console.log(posts);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
