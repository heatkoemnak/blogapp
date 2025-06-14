import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
export async function PUT(request, { params }) {
  const { id } = params;
  try {
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
    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      );
    }

    const updatedPost = await prisma.job.update({
      where: { id: id },
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
    return NextResponse.json(updatedPost, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
