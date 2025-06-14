// pages/api/jobs/sorted-by-salary.ts
import prisma from '@/libs/prismadb';
import { max } from 'date-fns';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const sort = searchParams?.get('sort'); // Default to ascending order if not specified

  console.log(sort);
  try {
    const jobs = await prisma.job.findMany({
      include: {
        JobSalary: true,
      },
      orderBy: sort === 'latest'
        ? { createdAt: 'desc' } // ✅ latest = newest first
        : {
            JobSalary: {
              minSalary: sort === 'desc' ? 'desc' : 'asc',
            },
          },

    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.log('Error sorting jobs by salary:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
