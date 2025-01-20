'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

import { IndustrySelection } from './ui/Selection/IndustrySelection';
import { TypeSelection } from './ui/Selection/TypeSelection';
import { LevelSelection } from './ui/Selection/LevelSelection';
import { SalarySelection } from './ui/Selection/SalarySelection';
import { JobCategorySelection } from './ui/Selection/JobCategorySelection';
import { GenderSelection } from './ui/Selection/GenderSelection';
import { QualificationSelection } from './ui/Selection/QualificationSelection';
import { SelectCountry } from './ui/Selection/location/SelectCountry';
import { SelectProvinceCity } from './ui/Selection/location/SelectProvinceCity';
import { SelectDistrict } from './ui/Selection/location/SelectDistrict';
import { SelectCommune } from './ui/Selection/location/SelectCommune';
import { JobDescription } from './ui/TextArea/JobDescription';
import { JobRequirement } from './ui/TextArea/JobRequirement';
import { JobResponsibility } from './ui/TextArea/JobResponsibility';

import { uploadImage } from '../utils/api';
import Image from 'next/image';
import ClosingDate from './ui/Selection/ClosingDate';
import { useBlogContext } from '../context/BlogProvider';
import { SelectCategoriesDialog } from './ui/modals/SelectCategoriesDialog';
import Label from './ui/Reusable/Label';
const PostJobForm = () => {
  const { data: session } = useSession();
  const date = new Date();
  const router = useRouter();
  const { jobCategories, countries, provinceCities } = useBlogContext();

  console.log(jobCategories);
  console.log(countries);
  console.log(provinceCities);

  const [links, setLinks] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({
    jobTitle: null,
    pax: null,
    jobType: null,
    jobIndustry: null,
    jobLevel: null,
    salaryRange: null,
    closingDate: null,
    jobCategory: null,
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
  const [jobTitle, setJobTitle] = useState(null);
  const [pax, setPax] = useState(null);
  const [isPuplish, setIsPublish] = useState(true);
  // selected
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

  // log

  console.log(jobTitle);
  console.log(pax);

  //log
  console.log(selectedJobIndustry);
  console.log(selectedJobType);
  console.log(selectedJobLevel);
  console.log(selectedSalaryRange);

  console.log(image);
  console.log(selectedCategory);
  console.log(selectedGender);
  console.log(selectQualification);

  console.log(selectedCountry);
  console.log(selectProvinceCity);
  console.log(selectDistrict);
  console.log(selectCommune);

  console.log(description);

  console.log(links);

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  const deadline = closingDate.toLocaleDateString('en-US', options);
  console.log(formattedDate);
  console.log(errors);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

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
      !image ||
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
        image: !image ? 'This field is required.' : null,
        description: !description ? 'This field is required.' : null,
        closingDate: !closingDate ? 'This field is required.' : null,
        links: !links ? 'This field is required.' : null,
        qualification: !selectQualification ? 'This field is required.' : null,
        jobType: !selectedJobType ? 'This field is required.' : null,
        jobIndustry: !selectedJobIndustry ? 'This field is required.' : null,
        jobLevel: !selectedJobLevel ? 'This field is required.' : null,
        salaryRange: !selectedSalaryRange ? 'This field is required.' : null,
      });
      setLoading(false);
      return;
    }

    let uploadedImageUrl = '';
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
      );

      try {
        const imageUpload = await uploadImage(formData);
        uploadedImageUrl = imageUpload.secure_url;
      } catch (error) {
        console.log(error);
        setError('Failed to upload image');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: jobTitle,
          pax,
          description,
          icon: uploadedImageUrl,
          authorEmail: session?.user?.email || 'keomnak@gmail.com',
          published: isPuplish,
          contact: links,
          publishedAt: formattedDate,
          closeDate: deadline,
          gender: selectedGender?.name,
          qualification: selectQualification?.name,
          jobCategoryId: selectedCategory?.id,
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
        console.log(data);
      } else {
        setError('Failed to post job');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      router.push('/jobs');
    }
  };

  return (
    <form className="bg-white border-t">
      <div className=" max-w-7xl mx-auto">
        <div className="border-b p-5 border-gray-900/10 pb-12">
          <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-6">
            <div className="col-span-full  ">
              {/* add jobTitle */}
              <div className=" p-2 mb-5 ">
                <h2 className="text-2xl font-semibold text-blue-gray-900">
                  Post new job
                </h2>
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
                  />
                  {errors.jobIndustry && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.jobIndustry}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName="Job Type" />
                  <TypeSelection setSelectedJobType={setSelectedJobType} />
                  {errors.jobType && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.jobType}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName="Level" />
                  <LevelSelection setSelectedJobLevel={setSelectedJobLevel} />
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
                    <div class="w-full py-9 bg-gray-50 border border-gray-300 gap-3 grid border-dashed">
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
                          <div class="flex flex-col items-center justify-center ">
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
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                  />
                                </g>
                              </svg>
                            </div>

                            <h2 class="text-center text-gray-400   text-xs leading-4">
                              PNG, JPG or PDF, smaller than 15MB
                            </h2>
                          </div>
                        )}
                      </div>

                      <div class="grid gap-2">
                        <div class="flex items-center justify-center">
                          <label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              hidden
                            />
                            <div class="flex w-28 h-9 px-2 flex-col bg-cyan-800 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
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
                  />
                </div>
                <div className="w-full ">
                  <Label labelName="Gender" />

                  <GenderSelection setSelectedGender={setSelectedGender} />
                  {errors.gender && (
                    <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                  )}
                </div>
                <div className="w-full ">
                  <Label labelName="Qualification" />
                  <QualificationSelection
                    setSelectionQualification={setSelectionQualification}
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

                  <SelectCountry setSelectedCountry={setSelectedCountry} />
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
              <h2 class=" text-lg font-semibold text-blue-gray-900 ">
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
              />
            </div>
          </div>
          <div className="flex gap-2 mt-20 text-right ">
            {loading ? (
              <button
                size="sm"
                className="bg-cyan-700 text-blue-gray-900"
                loading={true}
              >
                Loading
              </button>
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
                  Save Draft
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
                  Publish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostJobForm;
