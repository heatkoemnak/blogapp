import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = params;
    console.log(id);
    try {
        const applications = await prisma.Application.findMany({
            where: {
                userID: id
            },
            include: {
                Job: {
                    include: {
                        author: true,
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