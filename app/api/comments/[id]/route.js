import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  // const id = req.query;
  const { id } = params;
  console.log(id);

  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
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
    });
    if (!post) {
      throw new Error('Post not found with this id.');
    }
    console.log(post);
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}