'use client';

import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { RiCalendarCloseFill } from 'react-icons/ri';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import parse from 'html-react-parser';
import Link from 'next/link';
import Processing from '@/app/components/ui/Reusable/Processing';
import { LiaIndustrySolid } from 'react-icons/lia';
import { BiSolidCategory } from 'react-icons/bi';
import { MdOutlinePublic } from 'react-icons/md';

const fetcher = (url) => fetch(url).then((res) => res.json());

const JobDetails = () => {
  const params = useParams();
  // const id = params.id;
  // console.log(id);
  const { data, error, isLoading } = useSWR( `/api/jobs/company/${params.id}`,
    fetcher
  );

  if (isLoading) return <Processing state="Loading job details..." />;
  if (error || !data) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mt-1">
      {/* Highlighted Company Header */}
              <button type="button" onClick={() => window.history.back()} className="inline-block text-teal-600 px-4 py-2 rounded-md hover:bg-gray-200">Back</button>
      <div className="relative  max-w-5xl mx-auto min-h-[300px] overflow-hidden">
        <div className="group bg-teal-400 p-2 transition-all duration-300 lg:p-6">

          <div className="flex items-center gap-x-4">
            <Image
              src={data?.Company?.logoUrl || data?.Company?.icon || '/placeholder.png'}
              alt="Company Logo"
              width={40}
              height={40}
              className="w-12 h-12 object-cover rounded-full bg-white"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{data?.Company?.name}</h3>
            </div>
          </div>
          <div className="mt-2 text-white space-y-1">
            <h3 className="text-2xl font-semibold">{data?.title}</h3>
             <div className="flex text-sm items-center gap-1 text-gray-200">
              <MdOutlinePublic className="h-4 w-4 " />
              {data?.publishedAt}, {data?.ProvinceCity?.name}
            </div>
              {/* <span className="text-sm text-gray-300">{data?.ProvinceCity?.name}</span> */}
          </div>
          <div className="text-right space-x-2">
            <Link
              href={`/jobs/apply/${data?.id}`}
              className="inline-block bg-white text-teal-600 px-4 py-1 rounded-full hover:bg-gray-200"
            >
              Apply Now
            </Link>
            <button
              type="button"
              className="inline-block bg-white text-teal-600 px-4 py-1 rounded-full hover:bg-gray-200"
            >
              Save Job
            </button>
          </div>
        </div>
      </div>

      {/* Job Info + Description Grid */}
      <div className="max-w-5xl -mt-20 mx-auto grid gap-1 grid-cols-7">
        {/* Left Column - Job Info */}
        <div className="col-span-2 rounded-s-md  bg-gray-50 p-6 shadow">
          <h2 className="text-2xl font-semibold">Job Details</h2>
          <div className=" flex flex-col  space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-teal-600" />
              {data?.JobType?.name}
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-600" />
              {data?.ProvinceCity?.name}, {data?.JobLocation?.country}
            </div>
            {
              data?.JobLocation?.address && (
                <div className="flex items-center gap-2">
                  <HiBuildingOffice2 className="h-5 w-5 text-gray-600" />
                  {data?.JobLocation?.address}
                </div>
              )
            }
            {
              data?.JobSalary?.label && (
                <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="h-5 w-5 text-yellow-600" />
                  {data?.JobSalary?.label}
                </div>
              )
            }
            {
              data?.JobIndustry?.name && (
                <div className="flex items-center gap-2">
                  <LiaIndustrySolid  className="h-5 w-5 text-blue-700" />
                  {data?.JobIndustry?.name}
                </div>
              )
            }

            <div className="flex items-center gap-2">
              <BiSolidCategory   className="h-5 w-5 text-blue-700" />
              {data?.JobCategory?.name}
            </div>

            <div className="flex items-center gap-2">
              <RiCalendarCloseFill className="h-5 w-5 text-red-600" />
              {data?.closeDate}
            </div>
              {
            data?.JobLevel?.name && (
              <div className="flex items-center gap-2">
                {/* <GiTeacher className="h-5 w-5 text-blue-700" /> */}
                <b>Job Level:</b> {data?.JobLevel?.name}
              </div>
            )
           }
              {
            data?.gender && (
              <div className="flex items-center gap-2">
                {/* <GiTeacher className="h-5 w-5 text-blue-700" /> */}
                <b>Gender:</b> {data?.gender}
              </div>
            )
           }
              {
            data?.qualification && (
              <div className="flex items-center gap-2">
                {/* <GiTeacher className="h-5 w-5 text-blue-700" /> */}
                <b>Qualification:</b> {data?.qualification}
              </div>
            )
           }
              {
            data?.pax && (
              <div className="flex items-center gap-2">
                {/* <GiTeacher className="h-5 w-5 text-blue-700" /> */}
                <b>Pax:</b> {data?.pax}
              </div>
            )
           }
              {
            data?.Districts && data?.Communes && (
              <div className="flex items-center gap-2">
                {/* <GiTeacher className="h-5 w-5 text-blue-700" /> */}
                <b>Location:</b> {data?.Districts?.name}, {data?.Communes?.name}
              </div>
            )
           }
          </div>
        </div>

        {/* Right Column - Job Description */}
        <div className="col-span-5 bg-white p-10 text-sm text-gray-800">
          {data?.description ? parse(data.description) : <p>No description provided.</p>}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
