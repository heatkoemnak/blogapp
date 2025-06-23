'use client';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { timeAgo } from '@/app/utils/timeAgo';

import Tooltip from '../Reusable/Tooltip';
import { AiOutlineLike } from 'react-icons/ai';
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md';
import { BriefcaseIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { RiArrowRightUpBoxLine, RiCalendarCloseFill } from 'react-icons/ri';
import { MdOutlinePublic } from 'react-icons/md';

const JobRow = ({ job, grid }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`/api/jobs/${id}`);
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const BookmarkIcon = () =>
    isBookmarked ? (
      <MdOutlineBookmarkAdded
        size={25}
        className="text-cyan-700"
        onClick={toggleBookmark}
      />
    ) : (
      <MdOutlineBookmarkAdd
        size={25}
        className="text-gray-700"
        onClick={toggleBookmark}
      />
    );
  const DeleteUpdateButtons = () => (
    <>
      <button
        onClick={() => deleteJob(job?.id)}
        className="text-red-700 button text-sm border-2 border-red-500 px-3 py-0 rounded-full"
      >
        Delete
      </button>
      <Link
        href={`/jobs/update/${job?.id}?cpId=${job?.Company?.id}`}
        className="text-teal-900 text-sm border-2 border-teal-500 px-3 py-0 rounded-full"
      >
        Update
      </Link>
    </>
  );

  return (
    <>
      <div className="w-5xl card-bg-color py-6 px-6 rounded-none shadow-lg">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-medium -mt-2">{job?.title}</h2>
          <div className="flex items-center gap-2 -mt-5">
            <Link href={`/jobs/${job?.id}`}>
              <Image
                src={
                  job?.icon || 'https://via.placeholder.com/150x50?text=Logo'
                }
                width={35}
                height={35}
                alt="Company Logo"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              {grid && (
                <div className="flex flex-col">
                  <p className="text-md font-normal text-gray-600">
                    {job?.Company?.name}
                  </p>
                </div>
              )}
            </Link>
            {!grid && (
              <span className="text-gray-500"> {job?.Company?.name}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 text-gray-400">
            {!grid && (
              <div className="flex items-center text-blue-gray-600">
                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                <span className='text-sm'>{job?.JobSalary?.label}</span>
              </div>
            )}
            {!grid && (
              <div className="flex gap-1 rounded items-center text-sm font-medium text-teal-400 ">
                <BriefcaseIcon aria-hidden="true" className=" h-3 w-3  " />
                {job?.JobType?.name}
              </div>
            )}
            <button className="text-sm text-gray-500 hover:text-teal-700">
              {job?.ProvinceCity?.name}
            </button>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <MdOutlinePublic className="h-4 w-4 inline-block mr-1" />
              {timeAgo(job?.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {session && session?.user?.id === job?.author?.id ? (
              <>
                <button
                  onClick={() => deleteJob(job?.id)}
                  className="text-red-700 button text-sm border-2 border-red-500 px-3 py-0 rounded-full"
                >
                  Delete
                </button>
                <Link
                  href={`/jobs/update/${job?.id}?cpId=${job?.Company?.id}`}
                  className="text-teal-900 text-sm border-2 border-teal-500 px-3 py-0 rounded-full"
                >
                  Update
                </Link>
              </>
            ) : (
              <>
                <button className="text-gray-700 button border-2 hover:text-teal-500 text-sm border-gray-100 px-3 py-1 rounded-full">
                  <AiOutlineLike size={18} />
                </button>
                <span className="text-gray-500">3</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">Share</span>
                {isBookmarked ? (
                  <MdOutlineBookmarkAdded
                    className="text-cyan-700"
                    size={25}
                    onClick={toggleBookmark}
                  />
                ) : (
                  <MdOutlineBookmarkAdd
                    onClick={toggleBookmark}
                    size={25}
                    className="text-gray-700"
                  />
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1 items-center">
            {session ? (
              <>
                {session?.user?.id !== job?.author?.id && (
                  <Link
                    href={`/jobs/apply/${job?.id}`}
                    className="bg-teal-400 text-white text-sm px-2 py-1 rounded-full hover:bg-teal-800 transition-colors duration-300"
                  >
                    Apply
                  </Link>
                )}
                {session?.user?.id === job?.author?.id && (
                  <Link
                    href=""
                    className="bg-teal-400 text-white text-sm px-2 py-1 rounded-full hover:bg-teal-800 transition-colors duration-300 cursor-not-allowed opacity-50"
                  >
                    {`${job?.Applications?.length} Applied`}
                  </Link>
                )}
              </>

            ) : (
              <div className="flex items-center ">
                <Tooltip text="Login to make an apply." position="right">
                  <Link
                    href={'/login'}
                    className="px-3 py-1 bg-teal-400 hover:bg-teal-800 button-text-color rounded-full ml-4"
                  >
                    Apply
                  </Link>
                </Tooltip>
              </div>
            )}
            <>
            {grid ? (
                <RiArrowRightUpBoxLine
                size={25}
                className="text-gray-600 mx-1"
                />
              ) : (
                <Link
                href={`jobs/${job?.id}?cpId=${job?.companyId}`}
                className="px-2 py-0 bg-white border text-gray-600 hover:bg-teal-400 hover:text-white rounded-full ml-4"
                >
                    Views
                  </Link>
                )}
            </>
          </div>
          <span className="flex gap-1 text-sm text-red-400">
            {' '}
            <RiCalendarCloseFill className="h-4 w-4 shrink-0 text-red-800" />
            Close, {job?.closeDate}
          </span>
        </div>
      </div>
    </>
  );
};

export default JobRow;
