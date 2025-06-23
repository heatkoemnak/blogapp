// components/PostList.js
'use client';
import { useCallback, useEffect, useState } from 'react';
import ErrorHandlerMessage from './ui/Reusable/ErrorHandlerMessage';
import { JobTypeCheckbox } from './ui/CheckBoxs/JobTypeCheckbox';
import { JobLocation } from './ui/DropdownFilters/JobLocation';
import CategoriesLists from './ui/Selection/CategoriesLists';
import JobIndustry from './ui/DropdownFilters/JobIndustry';
import SalaryCheckbox from './ui/CheckBoxs/SalaryCheckbox';
import { JobLevelList } from './ui/CheckBoxs/JobLevelList';
import { useBlogContext } from '../context/BlogProvider';
import Processing from './ui/Reusable/Processing';
import { useSearchParams } from 'next/navigation';
import CompanyLists from './CompanyLists';
import Announcement from './Announcement';
import AllJobs from './ui/jobs/AllJobs';
import Logo from './Logo';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

const MainSection = ({setIsSearch}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sort');
  const { data, error, isLoading } = useSWR(
    sortBy ? `/api/jobs/sorted-by-salary/?sort=${sortBy}` : `/api/jobs`,
    fetcher,
    {
      shouldRetryOnError: true,
      errorRetryCount: 3, // Retry up to 3 times
      errorRetryInterval: 2000, // Retry every 2 seconds
    }
  );
  const { companies } = useBlogContext();
  const [filterList, setFilterList] = useState([]);

  const SearchHandler = useCallback(() => {
    const filterData = data?.filter((job) => {
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
  }, [data, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      SearchHandler();
      if (search) {
        setIsSearch(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [SearchHandler]);

  if (error) {
    return (
      <div className="max-w-6xl relative mx-auto">
        <ErrorHandlerMessage errorMessage={error.message} />
      </div>
    );
  }

  if (!data || isLoading) {
    return (
      <div className="max-w-6xl relative mx-auto">
        <Processing state="Job Loading..." />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl relative mx-auto ">
        {/* {isLoading && (
          <>
            <Logo />
            <Processing state="Job Loading..." />
          </>
        )} */}
        <div
          className={` grid grid-cols-7 gap-x-6 gap-y-2 ${
            isLoading ? 'opacity-50 ' : 'opacity-100'
          }`}
        >
          <div className="lg:w-full h-fit col-span-2 bg-white px-5 mt-4 ">
            <div className="lg:w-full h-fit col-span-1 bg-white px-5 ">

              <CategoriesLists />
              <JobTypeCheckbox />
              <JobLevelList />
              <SalaryCheckbox />
              <div className="font-semibold  text-blue-gray-900 text-md pt-5 px-2">
                Industry
              </div>
              <JobIndustry />
              <div className="font-semibold  text-blue-gray-900 text-md pt-5 px-2">
                Location
              </div>
              <JobLocation />
              <div className="my-10 ">
                <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-3xl xs:text-xl">
                  Our location
                </h1>
                <div className="relative w-full h-96">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15679.210631715993!2d104.88720468437495!3d11.589469545226954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951b1b527cdd9%3A0x974d94e95c3f09d!2sTeuk%20Thla%2C%20Sen%20Sok%2C%20Phnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1683456789012!5m2!1sen!2skh"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          {/* lext side section */}
          <div className="lg:w-full h-auto col-span-5 ">
            <AllJobs search={search} filterList={filterList} jobs={data} />
            <div className="lg:w-full h-fit col-span-4  ">
              <div className="company mt-2 ">
                <h4 className="ml-3 mt-5 text-blue-gray-500">Organizations</h4>
                {companies &&
                  companies.map((company, index) => (
                    <CompanyLists company={company} key={index} />
                  ))}
              </div>
              <h4 className="ml-3 mt-5 text-blue-gray-500">Anouncements</h4>
              <Announcement />
            </div>
          </div>
          {/* right side section */}
        </div>
      </div>
    </>
  );
};

export default MainSection;
