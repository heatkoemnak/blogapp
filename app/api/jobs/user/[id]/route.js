import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const job = await prisma.job.findMany({
      where: { authorEmail: id },
      include: {
        author: true, // Include the author details if needed
        Company: true, // Include company details if needed
        JobType: true, // Include job type
        JobCategory: true, // Include job category
        JobIndustry: true, // Include job industry details
        JobLevel: true, // Include job level
        JobLocation: true, // Include job location details
        JobSalary: true, // Include job salary details
        ProvinceCity: true, // Include province and city details
        Districts: true,
        Communes: true,
        Applications: true, // Include application details
      },
    });

    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error('Get error:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve job' },
      { status: 500 }
    );
  }
}
