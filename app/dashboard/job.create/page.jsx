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
import PostJobForm from '@/app/components/PostJobForm';
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
const Create = ({ params }) => {
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
              <h3>Job / New</h3>
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
        <PostJobForm/>

      </div>
    </OrgLayout>
  );
};

export default Create;
