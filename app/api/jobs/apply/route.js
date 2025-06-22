import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';

export async function GET( request ) {
    const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  console.log(email);
    if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }
    try {
        const applications = await prisma.Application.findMany({
            where: {
                Job: {
                authorEmail: email,
                },
            },
            include: {
                Job: {
                include: {
                    author: true,
                    Company: true,
                },
                },
            },
        });
        if (!applications) {
            return NextResponse.json({ message: 'No applications found.' }, { status: 404 });
        }
        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, position, email, phone, status, attachment, userID, jobID } =
        await request.json();

        const application = await prisma.Application.create({
            data: {
                name,
                position,
                email,
                phone,
                status,
                attachment,
                userID,
                jobID,
            },
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error('Error creating application:', error);

        await prisma.failedApplication.create({
            data: {
                message: error.message,
                stack: error.stack,
                userID,
                jobID,
            },
        });

        return new Response('Failed to create Application', { status: 500 });
    }
}