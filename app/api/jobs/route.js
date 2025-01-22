import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Query the database
  const { searchParams } = new URL(req.url); // Extract query parameters

  const searchTerm = searchParams.get('search');

  console.log(searchTerm);
  try {
    const jobs = await prisma.job.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm || '', // Search in title
              mode: 'insensitive', // Case insensitive
            },
          },
          // {
          //   description: {
          //     contains: searchTerm || '', // Search in description
          //     mode: 'insensitive',
          //   },
          // },
        ],
      },
      include: {
        author: true, // Include the author details if needed
        Company: true, // Include company details if needed
        JobType: true, // Include job type
        JobIndustry: true, // Include job industry details
        JobLevel: true, // Include job level
        JobLocation: true, // Include job location details
        JobSalary: true, // Include job salary details
        ProvinceCity: true, // Include province and city details
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Return the jobs in the response
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
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
