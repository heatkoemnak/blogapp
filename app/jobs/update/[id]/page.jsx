'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Image from 'next/image';
import { SelectCategoriesDialog } from '@/app/components/ui/modals/SelectCategoriesDialog';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { IndustrySelection } from '@/app/components/ui/Selection/IndustrySelection';
import { TypeSelection } from '@/app/components/ui/Selection/TypeSelection';
import { LevelSelection } from '@/app/components/ui/Selection/LevelSelection';
import { SalarySelection } from '@/app/components/ui/Selection/SalarySelection';
import { JobCategorySelection } from '@/app/components/ui/Selection/JobCategorySelection';
import { GenderSelection } from '@/app/components/ui/Selection/GenderSelection';
import { QualificationSelection } from '@/app/components/ui/Selection/QualificationSelection';
import { SelectCountry } from '@/app/components/ui/Selection/location/SelectCountry';
import { SelectProvinceCity } from '@/app/components/ui/Selection/location/SelectProvinceCity';
import { SelectDistrict } from '@/app/components/ui/Selection/location/SelectDistrict';
import { SelectCommune } from '@/app/components/ui/Selection/location/SelectCommune';
import { JobDescription } from '@/app/components/ui/TextArea/JobDescription';
import { useBlogContext } from '@/app/context/BlogProvider';
import Label from '@/app/components/ui/Reusable/Label';
import ClosingDate from '@/app/components/ui/Selection/ClosingDate';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const UpdateJob = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    id ? `/api/jobs/${id}` : null,
    fetcher,
    {}
  );
  const uploadImage = async (formData) => {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    return response.json();
  };
  const date = new Date();
  const router = useRouter();
  const [companyId, setCompany] = useState(null);
  const { jobCategories, companies } = useBlogContext();

  const [links, setLinks] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [pax, setPax] = useState(null);
  const [isPuplish, setIsPublish] = useState(true);

  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedJobIndustry, setSelectedJobIndustry] = useState(null);
  const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectProvinceCity, setSelectProvinceCity] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [selectCommune, setSelectCommune] = useState(null);
  const [selectQualification, setSelectionQualification] = useState(null);

  useEffect(() => {
    if (data) {
      setJobTitle(data?.title || null);
      setPax(data?.pax || null);
      setDescription(data?.description || null);
      setImageSrc(data?.icon || null); // Set initial image from data
      setIsPublish(data?.published || null);
      setSelectedJobType(data?.JobType?.id || null);
      setSelectedJobIndustry(data?.JobIndustry?.id || null);
      setSelectedJobLevel(data?.JobLevel?.id || null);
      setSelectedSalaryRange(data?.JobSalary?.id || null);
      setSelectedCountry(data?.JobLocation?.id || null);
      setSelectedCategory(data?.JobCategory?.id || null);
      setSelectedGender(data?.gender || null);
      setSelectProvinceCity(data?.ProvinceCity?.id || null);
      setSelectDistrict(data?.District?.id || null);
      setSelectCommune(data?.Commune?.id || null);
      setSelectionQualification(data?.qualification || null);
      setLinks(data?.contact || []);
      setClosingDate(data?.closeDate ? new Date(data.closeDate) : new Date());
      setCompany(data?.Company?.id || null);
    }
  }, [data]);

  const [errors, setErrors] = useState({
    jobTitle: null,
    pax: null,
    jobType: null,
    jobIndustry: null,
    jobLevel: null,
    salaryRange: null,
    closingDate: null,
    jobCategory: null,
    companyId: null,
    links: null,
    gender: null,
    country: null,
    provinceCity: null,
    district: null,
    commune: null,
    qualification: null,
    image: null,
    description: null,
  });

  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [closingDate, setClosingDate] = useState(date);

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  const deadline = closingDate.toLocaleDateString('en-US', options);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
      setImage(file); // Set the file object for upload
    };
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Validation checks
    if (
      !selectedCategory ||
      !jobTitle ||
      !pax ||
      !selectedJobType ||
      !selectedJobIndustry ||
      !selectedJobLevel ||
      !selectedSalaryRange ||
      !selectedGender ||
      !selectQualification ||
      !description ||
      !closingDate ||
      !selectedCountry ||
      !selectProvinceCity ||
      !selectDistrict ||
      !selectCommune
    ) {
      setErrors({
        jobTitle: !jobTitle ? 'This field is required.' : null,
        pax: !pax ? 'This field is required.' : null,
        jobCategory: !selectedCategory ? 'This field is required.' : null,
        gender: !selectedGender ? 'This field is required.' : null,
        country: !selectedCountry ? 'This field is required.' : null,
        provinceCity: !selectProvinceCity ? 'This field is required.' : null,
        district: !selectDistrict ? 'This field is required.' : null,
        commune: !selectCommune ? 'This field is required.' : null,
        description: !description ? 'This field is required.' : null,
        closingDate: !closingDate ? 'This field is required.' : null,
        links: links.length === 0 ? 'This field is required.' : null,
        qualification: !selectQualification ? 'This field is required.' : null,
        jobType: !selectedJobType ? 'This field is required.' : null,
        jobIndustry: !selectedJobIndustry ? 'This field is required.' : null,
        jobLevel: !selectedJobLevel ? 'This field is required.' : null,
        salaryRange: !selectedSalaryRange ? 'This field is required.' : null,
      });
      setLoading(false);
      return;
    }

    let iconUrl = data?.icon; // Default to existing icon

    // Only upload new image if one was selected
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
      );

      try {
        const imageUpload = await uploadImage(formData);
        iconUrl = imageUpload.secure_url;
      } catch (error) {
        console.error('Image upload failed:', error);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`/api/jobs/update/${id}`, {
        // Fixed API endpoint path
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: jobTitle,
          pax,
          description,
          icon: iconUrl, // Use either existing or new URL
          authorEmail: session?.user?.email || 'keomnak@gmail.com',
          published: isPuplish,
          contact: links,
          publishedAt: formattedDate,
          closeDate: deadline,
          gender: selectedGender?.name,
          qualification: selectQualification?.name,
          jobCategoryId: selectedCategory?.id,
          companyId: companyId,
          jobTypeId: selectedJobType?.id,
          jobIndustryId: selectedJobIndustry?.id,
          jobLevelId: selectedJobLevel?.id,
          jobLocationId: selectedCountry?.id,
          jobSalaryId: selectedSalaryRange?.id,
          communesId: selectCommune?.id,
          districtsId: selectDistrict?.id,
          provinceCityId: selectProvinceCity?.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Update successful:', data);
        router.push('/jobs');
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companies?.length && companyId) {
      companyName();
    }
  }, [companies, companyId]);

  const companyName = () => {
    const foundCompany = companies.find((company) => company.id === companyId);
    setCompany(foundCompany);
  };

  if (isLoading) return <p>Loading job details...</p>;
  if (error) return <p className="text-red-600">Failed to load job</p>;
  if (!data) return <p>Job not found</p>;
  return (
    <form className="bg-white border-t">
      <div className=" max-w-5xl mx-auto">
        <div className="border-b p-5 border-gray-900/10 pb-12">
          <div className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-6">
            <div className="col-span-full  ">
              {/* add jobTitle */}
              <div className="flex w-full justify-between items-center">
                <div className=" p-2 ">
                  <button type="button" onClick={() => router.back()}>
                    <div className="flex items-center text-blue-gray-900 hover:text-blue-600 transition-colors">
                      <ArrowLeftIcon className="h-5 w-5 mr-2" />
                      Back
                    </div>
                  </button>
                  <div className=" p-2 ">
                    <h2 className="text-2xl font-semibold text-blue-gray-900">
                      Post new job
                    </h2>
                  </div>
                </div>
                <div className=" p-2 mb-5 ">
                  <span>Organization</span>
                  <h2 className="text-2xl font-semibold text-blue-gray-900">
                    {data?.Company?.name}
                  </h2>
                </div>
              </div>
              <div className="col-span-full flex flex-col md:flex-row items-center justify-between ">
                <div className="flex w-full py-4 flex-col lg:flex-row gap-4 items-center lg:justify-between">
                  <div className="w-full">
                    <Label labelName="Job title" />
                    <div className="flex gap-2 items-center bg-white  pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        value={jobTitle}
                        type="text"
                        placeholder="e.g., Web Developer"
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full py-2 text-base text-gray-900  placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                    {errors.jobTitle && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.jobTitle}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Label labelName=" How many pax?" />
                    <div className="flex gap-2 items-center outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        value={pax}
                        type="number"
                        placeholder="Enter Pax"
                        onChange={(e) =>
                          setPax(parseInt(e.target.value, 10) || 0)
                        }
                        className="w-full ps-2 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none"
                        disabled={!jobTitle}
                      />
                    </div>
                    {errors?.pax && (
                      <p className="text-sm text-red-500 mt-1">{errors.pax}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* close add jobTitle */}
              <div className="col-span-full flex flex-col md:flex-row items-center justify-between py-4 gap-1 md:gap-4">
                <div className="w-full ">
                  <Label labelName="Industry" />
                  <IndustrySelection
                    setSelectedJobIndustry={setSelectedJobIndustry}
                    name={data?.JobIndustry?.name}
                  />
                  {errors.jobIndustry && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.jobIndustry}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName="Job Type" />
                  <TypeSelection
                    setSelectedJobType={setSelectedJobType}
                    name={data?.JobType?.name}
                  />
                  {errors.jobType && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.jobType}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName="Level" />
                  <LevelSelection
                    setSelectedJobLevel={setSelectedJobLevel}
                    name={data?.JobLevel?.name}
                  />
                  {errors.jobLevel && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.jobLevel}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName="Salary" />
                  <SalarySelection
                    setSelectedSalaryRange={setSelectedSalaryRange}
                    name={data?.JobSalary?.label}
                  />
                  {errors.salaryRange && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.salaryRange}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full flex lg:py-4 flex-col md:flex-row justify-between gap-1 md:gap-4">
                <div className="w-full ">
                  <Label labelName="Job icon" />
                  {errors.image && (
                    <p className="text-sm text-red-500 mt-1">{errors.image}</p>
                  )}
                  <div className="col-span-full">
                    <div className="w-full py-9 bg-gray-50 border border-gray-300 gap-3 grid border-dashed">
                      <div className="flex w-full items-center justify-center">
                        {imageSrc ? (
                          <div className="flex justify-center animate-pulse place-items-center rounded-lg ">
                            <Image
                              src={imageSrc}
                              alt="Preview"
                              width={500}
                              height={500}
                              className="w-40 h-40 rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center ">
                            <div className="flex bg-blue-gray-100 border border-gray-400 rounded-full w-40 h-40 justify-center items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                              >
                                <g id="Upload 02">
                                  <path
                                    id="icon"
                                    d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589"
                                    stroke="#4F46E5"
                                    strokeWidth="1.6"
                                    stroke-linecap="round"
                                  />
                                </g>
                              </svg>
                            </div>

                            <h2 className="text-center text-gray-400   text-xs leading-4">
                              PNG, JPG or PDF, smaller than 15MB
                            </h2>
                          </div>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center justify-center">
                          <label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              hidden
                            />
                            <div className="flex w-28 h-9 px-2 flex-col bg-cyan-800 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                              {imageSrc ? 'Change icon' : 'Upload job icon'}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <JobIconUpload /> */}
                </div>
                <div className="w-full">
                  <Label labelName="Choose category" />

                  {errors?.jobCategory && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.jobCategory}
                    </p>
                  )}
                  <JobCategorySelection
                    selectedJobIndustry={selectedJobIndustry}
                    jobCategories={jobCategories}
                    setSelectedCategory={setSelectedCategory}
                    name={data?.JobCategory?.name}
                  />
                </div>
                <div className="w-full ">
                  <Label labelName="Gender" />

                  <GenderSelection
                    setSelectedGender={setSelectedGender}
                    name={data?.gender}
                  />
                  {errors.gender && (
                    <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName="Qualification" />
                  <QualificationSelection
                    setSelectionQualification={setSelectionQualification}
                    name={data?.qualification}
                  />
                  {errors.qualification && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.qualification}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full flex flex-col py-4 md:flex-row items-center justify-between gap-1 md:gap-4">
                <div className="w-full ">
                  <Label labelName="Country" />

                  <SelectCountry
                    setSelectedCountry={setSelectedCountry}
                    name={data?.JobLocation?.name}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName="State/City" />

                  <SelectProvinceCity
                    setSelectProvinceCity={setSelectProvinceCity}
                    name={data?.ProvinceCity?.name}
                  />
                  {errors.provinceCity && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.provinceCity}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName=" District/Khan" />
                  <SelectDistrict
                    selectProvinceCity={selectProvinceCity}
                    setSelectDistrict={setSelectDistrict}
                    name={data?.ProvinceCity?.name}
                  />
                  {errors.district && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.district}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName=" District/KCommune/Sangkat" />
                  <SelectCommune
                    selectDistrict={selectDistrict}
                    setSelectCommune={setSelectCommune}
                  />
                  {errors.commune && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.commune}
                    </p>
                  )}
                </div>
              </div>
              <h2 className=" text-lg font-semibold text-blue-gray-900 ">
                Job description
              </h2>
              <div>
                <JobDescription
                  description={description}
                  errors={errors}
                  setDescription={setDescription}
                />
              </div>
            </div>

            <div className="col-span-full relative flex items-center justify-between">
              <label
                htmlFor="categories"
                className="text-lg font-semibold text-blue-gray-900"
              >
                How to apply?
              </label>
              <SelectCategoriesDialog links={links} setLinks={setLinks} />
            </div>
            <div className="col-span-full relative flex items-center justify-between">
              <label
                htmlFor="categories"
                className="text-lg font-semibold text-blue-gray-900"
              >
                Choose job deadline
              </label>
              <ClosingDate
                closingDate={closingDate}
                setClosingDate={setClosingDate}
                name={data?.closeDate}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-20 text-right ">
            {loading ? (
              <div className="h-screen flex justify-center items-center">
                <button
                  type="button"
                  className="py-2 px-4 flex justify-center items-center text-gray-800 bg-transparent focus:ring-blue-500 focus:ring-offset-blue-200 w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 max-w-md"
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
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={submitHandler}
                  disabled={!jobTitle || !description}
                  className={`py-2 px-4 text-white rounded ${
                    !jobTitle || !description
                      ? 'bg-gray-500 px-2 p-2 cursor-not-allowed'
                      : 'bg-gray-700 hover:bg-cyan-800'
                  }`}
                  aria-disabled={!jobTitle || !description}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitHandler}
                  disabled={!jobTitle || !description}
                  className={`py-2 px-4 text-white rounded ${
                    !jobTitle || !description
                      ? 'bg-cyan-400 cursor-not-allowed'
                      : 'bg-cyan-700 hover:bg-cyan-800'
                  }`}
                  aria-disabled={!jobTitle || !description}
                >
                  Save Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateJob;
