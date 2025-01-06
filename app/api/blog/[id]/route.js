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
export async function PUT(request, { params }) {
  try {
    const { title, body, links, categoryId, authorEmail, publishedAt, image } =
      await request.json();
    const { id } = params;

    const newPost = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        body,
        links,
        image,
        categoryId,
        authorEmail,
        publishedAt,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
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
    await prisma.post.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
