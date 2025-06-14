import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Return the jobs in the response
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch jobs', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const {
    title,
    pax,
    description,
    icon,
    authorEmail,
    published,
    contact,
    publishedAt,
    closeDate,
    gender,
    qualification,
    jobCategoryId,
    companyId,
    jobTypeId,
    jobIndustryId,
    jobLevelId,
    jobLocationId,
    jobSalaryId,
    provinceCityId,
  } = await request.json();

  try {
    const newJob = await prisma.job.create({
      data: {
        title,
        pax,
        description,
        icon,
        authorEmail,
        published,
        contact,
        publishedAt,
        closeDate,
        gender,
        qualification,
        jobCategoryId,
        companyId,
        jobTypeId,
        jobIndustryId,
        jobLevelId,
        jobLocationId,
        jobSalaryId,
        provinceCityId,
      },
    });

    return NextResponse.json(
      newJob,
      { message: 'Post created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create the post with associated categories');
  }
}
