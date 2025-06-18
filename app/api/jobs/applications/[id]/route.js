import prisma from '@/libs/prismadb';

import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    const { id } = params;
    try {
        await prisma.Application.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: 'Application deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}