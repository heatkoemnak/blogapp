import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { title, body, image, authorEmail, categoryId, links, publishedAt } = await request.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        body,
        image,
        authorEmail,
        categoryId,
        links,
        publishedAt,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
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
export async function PUT(request, { params }) {
  try {
    const { title, body, image, authorEmail, categoryId, links, publishedAt } = await request.json();
    const { id } = params;

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        body,
        image,
        authorEmail,
        categoryId,
        links,
        publishedAt,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.post.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}