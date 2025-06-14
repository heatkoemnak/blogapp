'use client';
import React, { useEffect, useState } from 'react';
import OrgLayout from '@/app/components/Dashboard/OrgLayout';
import { uploadIcon } from '@/app/utils/api';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MdOutlineAddAPhoto, MdSettingsBackupRestore } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiSave } from 'react-icons/bi';
import { LiaEditSolid } from 'react-icons/lia';
import axios from 'axios';
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
const UpdateOrg = ({ params }) => {
  const { data: session } = useSession();
  const { id: companyId } = params;
  const { data, isLoading } = useSWR(
    `/api/companies/unique/${companyId}`,
    fetcher,
    {
      shouldRetryOnError: true,
      errorRetryCount: 3, // Retry up to 3 times
      errorRetryInterval: 2000, // Retry every 2 seconds
    }
  );
  const router = useRouter();
  const [FORM_DATA, setFORM_DATA] = useState({
    name: '',
    industry: '',
    contactNumber: '',
    email: '',
    website: '',
    logoUrl: '',
    userID: session?.user.id || '',
  });
  console.log(FORM_DATA);
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isEdit, setIsEdit] = useState(true);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [required, setRequired] = useState({
    name: '',
    industry: '',
    email: '',
  });
  console.log(required);
  const toogleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    if (data) {
      setFORM_DATA(data);
      setImageSrc(data.logoUrl);
    }
  }, [data]);

  const handleFileChange = (e) => {
    // if (FORM_DATA?.logoUrl) {
    //   setImageSrc(FORM_DATA.logoUrl);
    //   setImage(null);
    // }
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
    let iconUrl = data?.logoUrl;
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
      );
      try {
        const imageUpload = await uploadIcon(formData);
        iconUrl = imageUpload.secure_url;
      } catch (error) {
        console.error(error);
        setError('Failed to upload image');
        setLoading(false);
        return;
      }
    }
    const { name, industry, contactNumber, email, website } = FORM_DATA;
    if (
      !name ||
      name.trim() === '' ||
      !industry ||
      industry.trim() === '' ||
      !email ||
      email.trim() === ''
    ) {
      setRequired({
        name: 'Please enter a company name',
        industry: 'Please enter a company industry',
        email: 'Please enter a valid email address',
      });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setRequired({
        email: 'Please enter a valid email address',
      });
    }

    const COMPNAY_DATA = {
      name: name,
      industry: industry,
      contactNumber: contactNumber,
      email: email,
      website: website,
      logoUrl: iconUrl,
      userID: session?.user.id || '',
    };

    try {
      await fetch(`/api/companies/${companyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(COMPNAY_DATA),
      });
      router.push('/dashboard/orgs');
      setLoading(false);
      setRequired({});

      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      router.refresh();
    }
  };
  return (
    <OrgLayout>
      <div className="relative overflow-x-auto mt-20 bg-blue-gray-50">
        <div className="px-6 py-2 bg-white rounded-t-md border-b border-gray-200">
          <ul className="flex gap-5 ">
            <Link href="/dashboard/orgs">
              <h3>Organizations / {FORM_DATA?.name}</h3>
            </Link>
          </ul>
          <div className="flex bg-white items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
            <div className="relative flex items-center gap-2">
              <div
                onClick={toogleEdit}
                className="flex gap-1 items-center text-white bg-teal-400 border border-gray-300 focus:outline-none hover:bg-teal-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                {isEdit ? (
                  <button
                    type="button"
                    onClick={submitHandler}
                    className="flex gap-1 items-center rounded-full"
                  >
                    <BiSave />
                    <span className="text-white">
                      {loading ? 'Saving...' : 'Save'}
                    </span>
                  </button>
                ) : (
                  <div className="flex gap-1 items-center rounded-full">
                    <LiaEditSolid />
                    <span className="text-white">Edit</span>
                  </div>
                )}
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
      
        <div className="max-w-7xl overflow-y-scroll mx-auto bg-white p-9 shadow-lg z-50">
          <form onSubmit={submitHandler} className=" border-gray-900/10">
            <div className=" grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 -mt-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Company Name
                  <span className="text-red-500">{required?.name && '*'}</span>
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={FORM_DATA.name}
                    onChange={(e) =>
                      setFORM_DATA({ ...FORM_DATA, name: e.target.value })
                    }
                    placeholder="e.g. ABC Company"
                    className={`block w-full border-2  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 ${
                      required?.name
                        ? 'focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 border-red-300 placeholder:text-red-500'
                        : 'focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400'
                    } sm:text-sm/6`}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-end h-[70px]">
                  <div>
                    {imageSrc ? (
                      <div className="relative group flex items-center">
                        <img
                          src={imageSrc }
                          alt="Company Logo"
                          className="w-14 h-14 border group-hover:opacity-50 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="absolute top-2  left-2 border border-red-400 bg-white w-10 h-10 flex items-center justify-center  rounded-full hover:text-red-600 text-sm text-red-500">
                            <RiDeleteBinLine
                              onClick={() => setImageSrc(null)}
                            />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="rounded-md border mt-2 border-indigo-500 bg-gray-50 p-4 shadow-sm w-36">
                          <label
                            for="upload"
                            className="flex flex-col items-center gap-2 cursor-pointer"
                          >
                            <MdOutlineAddAPhoto />

                            <span className="text-gray-600 text-sm">
                              Upload
                            </span>
                          </label>
                          <input
                            id="upload"
                            onChange={handleFileChange}
                            type="file"
                            disabled={!isEdit}
                            className="hidden"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3 -mt-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                  <span className="text-red-500">{required?.email && '*'}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={FORM_DATA.email}
                    onChange={(e) =>
                      setFORM_DATA({ ...FORM_DATA, email: e.target.value })
                    }
                    disabled={!isEdit}
                    placeholder="e.g. 5VYlE@example.com"
                    className={`block w-full border-2   rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 ${
                      required?.email
                        ? 'focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 border-red-300 placeholder:text-red-500'
                        : 'focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400'
                    } sm:text-sm/6`}
                  />
                </div>
              </div>

              <div className="sm:col-span-3 -mt-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Industry
                  <span className="text-red-500">
                    {/* {required?.industry && '*'} */}
                  </span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={FORM_DATA.industry}
                    onChange={(e) =>
                      setFORM_DATA({ ...FORM_DATA, industry: e.target.value })
                    }
                    disabled={!isEdit}
                    placeholder="e.g. IT, Finance, etc."
                    className={`block w-full border-2  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 ${
                      required?.industry &&
                      'focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 border-red-300 placeholder:text-red-500'
                    } sm:text-sm/6 border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400`}
                  />
                </div>
              </div>

              <div className="sm:col-span-3 -mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Website
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={FORM_DATA.website}
                    onChange={(e) =>
                      setFORM_DATA({ ...FORM_DATA, website: e.target.value })
                    }
                    disabled={!isEdit}
                    placeholder="https://example.com"
                    className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 -mt-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Tel
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={FORM_DATA.contactNumber}
                    onChange={(e) =>
                      setFORM_DATA({
                        ...FORM_DATA,
                        contactNumber: e.target.value,
                      })
                    }
                    disabled={!isEdit}
                    placeholder="+855 911 234 567"
                    className="block w-full border-2  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full -mt-4">
                <label
                  htmlFor="street-address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Street address
                  <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    disabled={!isEdit}
                    placeholder="1234 Main St, Apt 101, City, State, ZIP"
                    className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1 -mt-4">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  City
                  <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    disabled={!isEdit}
                    placeholder="e.g. Phnom Penh"
                    className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 -mt-4">
                <label
                  htmlFor="region"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  State / Province
                  <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="region"
                    type="text"
                    disabled={!isEdit}
                    autoComplete="address-level1"
                    className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 -mt-4">
                <label
                  htmlFor="postal-code"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  ZIP / Postal code
                  <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="postal-code"
                    name="postal-code"
                    type="text"
                    disabled={!isEdit}
                    autoComplete="postal-code"
                    className="block  border  w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </OrgLayout>
  );
};

export default UpdateOrg;
