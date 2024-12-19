import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
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
        likes: 'desc',
      },
    });
    if (!posts) {
      throw new Error('Post not found .');
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
