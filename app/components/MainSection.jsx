// components/PostList.js
'use client';
import { useCallback, useEffect, useState } from 'react';
import { JobTypeCheckbox } from './ui/CheckBoxs/JobTypeCheckbox';
import { JobLevelList } from './ui/CheckBoxs/JobLevelList';
import { useBlogContext } from '../context/BlogProvider';
import { JobLocation } from './ui/DropdownFilters/JobLocation';

import Urgency from './ui/jobs/Urgent';
import SalaryCheckbox from './ui/CheckBoxs/SalaryCheckbox';
import CompanyLists from './CompanyLists';
import Announcement from './Announcement';
import JobIndustry from './ui/DropdownFilters/JobIndustry';
import CategoriesLists from './ui/Selection/CategoriesLists';
import JobRow from './ui/jobs/JobRow';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import AllJobs from './ui/jobs/AllJobs';

const MainSection = () => {
  const [jobs, setJobs] = useState([]);
  const { companies } = useBlogContext();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [loading, setLoading] = useState(false);
  const [filterList, setFilterList] = useState([]);
  console.log(jobs);

  const SearchHandler = useCallback(() => {
    const filterData = jobs?.filter((job) => {
      const jobTitle = job.title?.toLowerCase();
      const jobType = job?.JobType?.name.toLowerCase();
      const Salary = job?.JobSalary?.label.toLowerCase();
      const JobLevel = job?.JobLevel?.name.toLowerCase();
      const JobIndustry = job?.JobIndustry?.name.toLowerCase();
      const jobCategory = job?.JobCategory?.name.toLowerCase();

      const searchTerm = search?.toLowerCase();
      return (
        jobTitle?.includes(searchTerm) ||
        jobType?.includes(searchTerm) ||
        JobLevel?.includes(searchTerm) ||
        JobIndustry?.includes(searchTerm) ||
        Salary?.includes(searchTerm) ||
        jobCategory?.includes(searchTerm) ||
        !searchTerm
      );
    });
    setFilterList(filterData);
  }, [jobs, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      SearchHandler();
    }, 1000);

    return () => clearTimeout(timer);
  }, [SearchHandler]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/jobs');
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl relative px-20 mx-auto ">
      {loading && (
        <button
          type="button"
          className="absolute top-0 left-1/2 transform -translate-x-1/2  py-2 px-4 flex justify-center items-center text-gray-800 bg-transparent focus:ring-blue-500 focus:ring-offset-blue-200 w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 max-w-md"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2 animate-spin"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
          </svg>
          Loading
        </button>
      )}
      <div
        className={` grid grid-cols-5 gap-x-2 gap-y-2 ${
          loading ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {/* lext side section */}
        <div className="lg:w-full h-auto col-span-3 ">
         
          <AllJobs search={search} filterList={filterList} jobs={jobs} />

          <div className="lg:w-full h-fit col-span-4  ">
            <div className="font-semibold text-blue-gray-900 text-md pt-5 pb-2 px-2">
              Companies
            </div>
            {companies &&
              companies.map((company, index) => (
                <CompanyLists company={company} key={index} />
              ))}
            <div className="font-semibold text-blue-gray-900 text-md pt-5 pb-2 px-2">
              Announcements
            </div>
            <Announcement />
         
          </div>
        </div>
        {/* right side section */}
        <div className="lg:w-full h-fit col-span-2 bg-white px-5 ">
          <div className="lg:w-full h-fit col-span-1 bg-white px-5 ">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-blue-gray-900 text-md pt-5 px-2">
                Categories
              </div>
              <div className="font-semibold text-gray-600 text-sm pt-5 px-2">
                Clear
              </div>
            </div>
            <CategoriesLists />
            <JobTypeCheckbox />
            <JobLevelList />
            <div className="font-semibold  text-blue-gray-900 text-md pt-5 px-2">
              Industry
            </div>
            <JobIndustry />
            <SalaryCheckbox />
            <div className="font-semibold  text-blue-gray-900 text-md pt-5 px-2">
              Location
            </div>
            <JobLocation />
            <div class="my-10 ">
              <h1 class="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-3xl xs:text-xl">
                Our location
              </h1>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8074242.981711193!2d102.0173132926473!3d12.565679006985642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109573f79d47b07%3A0xe22cd58e23f63ad6!2sCambodia!5e0!3m2!1sen!2skh!4v1710567234587!5m2!1sen!2skh"
                className="rounded-lg w-full h-full"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
