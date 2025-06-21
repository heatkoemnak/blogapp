import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const applications = await prisma.Application.findMany({
            include: {
                Job: {
                    include: {
                        Company: true,
                    },
                }
            },
        });
        if (!applications) {
            return NextResponse.json({ message: 'No user created.' }, { status: 500 });
        }
        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        console.log(error);
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