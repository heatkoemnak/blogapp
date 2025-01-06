import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const {
    title,
    content,
    images,
    authorEmail,
    categoryNames,
    links,
    publishedAt,
  } = await request.json();

  if (!title || !content || !authorEmail || categoryNames.length === 0) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    // Upsert categories
    const categories = await Promise.all(
      categoryNames.map((name) =>
        prisma.category.upsert({
          where: { name },
          update: {}, // No update needed since name is unique
          create: { name, postIDs: [] }, // Create the category if it doesn't exist
        })
      )
    );

    console.log(categories);

    // Extract category IDs
    const categoryIDs = categories.map((category) => category.id);
    console.log(categoryIDs);

    // Create the new post
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        images: images || [], // Default to an empty array if undefined
        authorEmail,
        categories: {
          connect: categoryIDs.map((id) => ({ id })), // Connect categories to the post
        },
        links: links || [], // Default to an empty array if undefined
        published: true,
        likes: 0,
        views: 0,
        publishedAt: publishedAt || null,
      },
    });

    // Safely update postIDs array for each category
    await Promise.all(
      categories.map((category) =>
        prisma.category.update({
          where: { id: category.id },
          data: {
            postIDs: { push: newPost.id }, // Add the new post ID to the postIDs array
          },
        })
      )
    );
    return NextResponse.json(
      newPost,
      { message: 'Post created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create the post with associated categories');
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
            content: {
              contains: searchTerm || '', // Search in content
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        author: true,
        categories: true,
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
