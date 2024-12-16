import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request, res) {
  try {
    const { postId } = await request.json();

    // Increment the like counter in the Post model
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } }, // Increment likes field
    });

    return NextResponse.json(
      { postId, likes: updatedPost.likes },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error adding like:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
