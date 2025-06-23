import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const job = await prisma.job.findUnique({
      where: { id },
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
        Districts:true,
        Communes:true,
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
export async function DELETE(req, { params }) {
  const { id } = params;
  console.log(id);
  try {
    await prisma.job.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: 'Job deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
