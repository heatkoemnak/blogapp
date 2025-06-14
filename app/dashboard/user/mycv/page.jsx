import CVLayout from '@/app/components/Dashboard/CVLayout';
import Link from 'next/link';
import React from 'react';

const Mycv = () => {
  const cvs = [
    {
      name: 'John Doe',
      image:
        'https://res.cloudinary.com/dakqa3htw/image/upload/v1746602256/1131w-T9RPR4DPdiw_nootnu.jpg',
      applyFor: 'Frontend Developer',
      status: 'Saved',
    },
    {
      name: 'Jane Smith',
      image:
        'https://res.cloudinary.com/dakqa3htw/image/upload/v1746602256/canva-professional-cv-resume-tKGZN6ITwTw_qoeul8.jpg',
      applyFor: 'Backend Developer',
      status: 'Draft',
    },
    {
      name: 'Alice Brown',
      image:
        'https://res.cloudinary.com/dakqa3htw/image/upload/v1746602256/canva-simple-professional-cv-resume-36p5VOFVDxY_wy8dws.jpg',
      applyFor: 'UI/UX Designer',
      status: 'Saved',
    },
    {
      name: 'Michael Lee',
      image:
        'https://res.cloudinary.com/dakqa3htw/image/upload/v1746602256/canva-blue-and-gray-simple-professional-cv-resume-krkiJPv9338_s60bnf.jpg',
      applyFor: 'Data Analyst',
      status: 'Draft',
    },
    {
      name: 'Sophia Davis',
      image:
        'https://res.cloudinary.com/dakqa3htw/image/upload/v1746602258/-uUY_P9di5-photo_nprm6i.jpg',
      applyFor: 'Project Manager',
      status: 'Saved',
    },
    {
      name: 'Daniel Clark',
      image:
        'https://res.cloudinary.com/dakqa3htw/image/upload/v1746602257/student-jouralist-cv-example-for-students_d79mkb.jpg',
      applyFor: 'DevOps Engineer',
      status: 'Draft',
    },
  ];
  return (
    <CVLayout>
      <div className=" w-full py-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-gray-900">My CV</h1>
          <p className="text-gray-600">Manage your CVs and resumes</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
          Create CV
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cvs.map((cv, index) => (
          <div
            key={index}
            className="relative p-4 bg-white rounded-lg shadow-lg group"
          >
            <img
              src={cv.image}
              alt={cv.name}
              className="w-50 h-50 mb-2 rounded-md mx-auto"
            />
            <h3 className="text-lg font-semibold text-center">{cv.name}</h3>
            <p className="text-gray-600 text-center">{cv.applyFor}</p>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={'/cv/edit'}
                download
                className="bg-cyan-400 text-white px-4 mr-2 py-2 rounded-none hover:bg-teal-600 transition duration-300"
              >
                Edit
              </Link>
              <a
                href={cv.image}
                download
                className="bg-teal-500 text-white px-4 py-2 rounded-none hover:bg-teal-600 transition duration-300"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </CVLayout>
  );
};

export default Mycv;
