'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import Label from '@/app/components/ui/Reusable/Label';
import Processing from '@/app/components/ui/Reusable/Processing';
import useSWR from 'swr';
import JobLayoutDashbord from '@/app/components/Dashboard/JobLayoutDashbord';
import HeaderSection from '@/app/components/ui/Reusable/HeaderSection';
import Link from 'next/link';
import { LiaEditSolid } from 'react-icons/lia';
import { BiSave } from 'react-icons/bi';
import { MdSettingsBackupRestore } from 'react-icons/md';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ViewJob = () => {
  const { id } = useParams();
  const router = useRouter();



  const { data, error, isLoading } = useSWR(
    id ? `/api/jobs/${id}` : null,
    fetcher
  );

  if (isLoading) return <Processing state="Loading job details..." />;
  if (error) return <p>Failed to load job details.</p>;
  if (!data) return <p>Job not found.</p>;

  const jobDetails = [
    { label: 'Industry', value: data.JobIndustry?.name },
    { label: 'Job Type', value: data.JobType?.name },
    { label: 'Level', value: data.JobLevel?.name },
    { label: 'Salary', value: data.JobSalary?.label },
    { label: 'Category', value: data.JobCategory?.name },
    { label: 'Gender', value: data.gender },
    { label: 'Qualification', value: data.qualification },
    { label: 'Country', value: data.JobLocation?.name },
    { label: 'State/City', value: data.ProvinceCity?.name },
    { label: 'District/Khan', value: data.District?.name },
    { label: 'Commune/Sangkat', value: data.Commune?.name },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <JobLayoutDashbord>
      <HeaderSection title="Job Details" />
      <div className="px-6 py-2 bg-white rounded-t-md border-b border-gray-200">
          <div className="flex bg-white items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
            <div className="relative flex items-center gap-2">
              <div
                className="flex gap-1 items-center text-white bg-teal-400 border border-gray-300 focus:outline-none hover:bg-teal-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                  <Link
                    href={`/dashboard/job.update/${id}`}
                    className="flex gap-1 items-center rounded-full"
                  >
                    <LiaEditSolid />
                    <span className="text-white">Edit</span>
                  </Link>
              </div>
              <button
                onClick={() => router.back()}
                className="flex gap-1 items-center text-white bg-teal-400 border border-gray-300 focus:outline-none hover:bg-teal-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <div className="flex gap-1 items-center rounded-full">
                  <MdSettingsBackupRestore />
                  <span className="text-white">Discard</span>
                </div>
              </button>
            </div>
          </div>
        </div>
    <div className="bg-white border-t">
      <div className="max-w-6xl mx-auto p-5">
        <div className="border-b border-gray-900/10 pb-12">
          {/* Header */}
          <div className="flex justify-end items-center mb-6">

            <div className="text-right">
              <span className="text-sm text-gray-500">Organization</span>
              <h2 className="text-2xl font-semibold text-blue-gray-900">
                {data.Company?.name || 'N/A'}
              </h2>
            </div>
          </div>

          {/* Job Title & Pax */}
          <div className="mb-8">
            <Label labelName="Job Title" />
            <h1 className="text-xl font-bold text-gray-900">{data.title}</h1>
            <p className="text-lg text-gray-600 mt-1">{data.pax} Position(s)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Details */}
            <div className="md:col-span-8">
              {/* Job Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mb-8">
                {jobDetails.map(
                  (detail) =>
                    detail.value && (
                      <div key={detail.label}>
                        <Label labelName={detail.label} />
                        <p className="text-base text-gray-800">{detail.value}</p>
                      </div>
                    )
                )}
                 <div>
                    <Label labelName="Closing Date" />
                    <p className="text-base text-gray-800">{formatDate(data.closeDate)}</p>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h2 className="text-xl font-semibold text-blue-gray-900 mb-2">
                  Job Description
                </h2>
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>
            </div>

            {/* Right Column: Icon */}
            <div className="md:col-span-4">
               <Label labelName="Job Icon" />
               <div className="mt-2 flex justify-center items-center p-4 bg-gray-50 border border-dashed rounded-lg">
                {data.icon ? (
                  <Image
                    src={data.icon}
                    alt={`${data.title} icon`}
                    width={200}
                    height={200}
                    className="w-48 h-48 rounded-full object-cover"
                  />
                ) : (
                   <div className="flex flex-col items-center justify-center text-gray-500">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                     <p>No Icon Provided</p>
                   </div>
                )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </JobLayoutDashbord>
  );
};

export default ViewJob;