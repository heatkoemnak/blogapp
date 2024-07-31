import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text, authorEmail, postId, publishedAt } = await request.json();

    if (!text && !authorEmail && !postId) {
      return NextResponse.json(
        { message: 'Text ,authorEmail and postId are required.' },
        { status: 500 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        text,
        authorEmail,
        postId,
        publishedAt,
      },
    });
    if (newComment) {
      await prisma.comment.findMany({
        include: {
          author: true,
          replies: {
            include: {
              author: true,
            },
          },
        },
      });
    }
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
    });
    if (comments.length <= 0) {
      return NextResponse.json(
        { message: 'No comments created.' },
        { status: 500 }
      );
      throw new Error('No comments created.');
    }
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
