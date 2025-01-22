'use client';

import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useBlogContext } from '@/app/context/BlogProvider';
import parse from 'html-react-parser';
import Image from 'next/image';
import { RiCalendarCloseFill } from 'react-icons/ri';

const JobDetails = () => {
  const { jobs } = useBlogContext();
  const params = useParams();
  const id = params.id;
  const [job, setJob] = useState(null);

  console.log(id);
  console.log(job);

  const getAJobById = () => {
    const foundJob = jobs.find((company) => company.id === id);
    setJob(foundJob);
  };

  useEffect(() => {
    if (jobs && id) {
      getAJobById();
    }
  }, []);

  return (
    <>
      <div className="mt-5">
        <div class="relative w-full min-h-[500px] overflow-hidden">
          <div class="absolute inset-0">
            <img
              src="https://www.mustgo.com/wp-content/uploads/2018/04/iStock-692910484.jpg"
              alt="დუბროვნიკი"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/0 dark:bg-black/40"></div>
          </div>

          <div class="relative w-full md:w-[600px] lg:w-[700px] p-8 md:p-12 mt-8 md:mt-12 mx-auto md:mr-8 lg:mr-12">
            <div class="bg-white/90 dark:bg-gray-800/90 p-8 rounded-lg backdrop-blur-sm">
              <div class="max-w-2xl">
                <h2 class="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                  Our Company
                </h2>

                <p class="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, repellendus.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                  <button class="bg-teal-600 dark:bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition-colors">
                    Apply
                  </button>
                  <a
                    href="#"
                    class="text-teal-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center transition-colors"
                  >
                    Learn more
                    <svg
                      class="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mt-5 bg-white mx-auto p-10">
          <Image
            src={job?.icon}
            width={500}
            height={500}
            alt=""
            class="w-40 h-40 object-cover"
          />
          <div className=" bg-white rounded-lg p-6 items-center mb-6">
            <h1 className="text-4xl font-bold mb-8">{job?.title}</h1>
            <div className="min-w-0 flex-1">
              <div className="mt-1 flex flex-col space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1 items-center bg-teal-400 text-white text-sm px-2 py-1 rounded">
                    <BriefcaseIcon className="h-4 w-4 shrink-0" />
                    <span className=" text-sm">
                      {job?.JobType.name}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <MapPinIcon className="h-4 w-4 shrink-0 text-gray-500" />
                    <span className="text-gray-700 text-sm">
                      {job?.ProvinceCity.name}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <CurrencyDollarIcon className="h-4 w-4 shrink-0 text-yellow-800" />
                    <span className="text-gray-700 text-sm">
                      {job?.JobSalary.label}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <HiBuildingOffice2 className="h-4 w-4 shrink-0 text-yellow-800" />
                    <span className="text-gray-700 text-sm">
                      {job?.Company.name}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <RiCalendarCloseFill  className="h-4 w-4 shrink-0 text-red-800" />
                    <span className="text-gray-700 text-sm">
                      {job?.closeDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 py-5 bg-gray-100 rounded-md">
            {job?.description ? parse(job?.description) : null}
          </div>
          <div className="font-semibold text-blue-gray-900 text-lg pt-5 pb-1 px-2">
            How to Apply
          </div>
          <p className="text-lg leading-8 mb-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ultricies dui ac suscipit vestibulum. Pellentesque euismod turpis
            vel sapien bibendum, non faucibus justo placerat. In hac habitasse
            platea dictumst. Morbi id tincidunt elit. Praesent consectetur
            eleifend mi, vitae gravida ante fringilla quis. Duis maximus, erat
            metus interdum eros, in rhoncus leo augue quis quam. Sed rhoncus
            consequat ipsum, vel egestas leo congue eu.
          </p>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
