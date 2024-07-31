import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text, authorEmail, commentId, publishedAt } = await request.json();

    if (!text && !authorEmail && !commentId) {
      return NextResponse.json(
        { message: 'Text ,authorEmail and commentId are required.' },
        { status: 500 }
      );
    }
    const newReply = await prisma.reply.create({
      data: {
        text,
        authorEmail,
        commentId,
        publishedAt,
      },
    });
    return NextResponse.json(newReply, { status: 201 });
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
    const replies = await prisma.reply.findMany({
      include: {
        author: true,
        comment: true,
      },
    });
    if (replies.length <= 0) {
      return NextResponse.json(
        { message: 'No replies created.' },
        { status: 500 }
      );
    }
    return NextResponse.json(replies, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
