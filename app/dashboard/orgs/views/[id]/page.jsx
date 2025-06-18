'use client';
import React, { useEffect, useState } from 'react';
import OrgLayout from '@/app/components/Dashboard/OrgLayout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MdOutlineAddAPhoto, MdSettingsBackupRestore } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { LiaEditSolid } from 'react-icons/lia';
import axios from 'axios';

const ViewsOrg = ({ params }) => {
  const { data: session } = useSession();
  const { id: companyId } = params;
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
  const [isEdit, setIsEdit] = useState(false);
  const toogleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    if (companyId) {
      axios
        .get(`/api/companies/unique/${companyId}`)
        .then((res) => setFORM_DATA(res.data))
        .catch((err) => console.error('Error fetching company:', err));
    }
  }, [companyId]);

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
                    className="flex gap-1 items-center rounded-full"
                  >
                    <BiSave />
                    <span className="text-white">Save</span>
                  </button>
                ) : (
                  <Link
                    href={`/dashboard/orgs/update/${companyId}`}
                    className="flex gap-1 items-center rounded-full"
                  >
                    <LiaEditSolid />
                    <span className="text-white">Edit</span>
                  </Link>
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

        <div className="max-w-7xl overflow-y-scroll mx-auto bg-white px-9 shadow-lg z-50">
          <div className="flex justify-between items-center gap-5 mt-5 mb-2">
            <div>
              <h2 className="text-gray-800 text-3xl  rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                {FORM_DATA.name}
              </h2>
            </div>
            <div>
              <img
                className="w-20 rounded-md"
                src={FORM_DATA.logoUrl}
                width={100}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className='max-w-7xl mx-auto overflow-y-scroll bg-white border-b'>
          <button className=" bg-white p-2 ml-8 px-4 border border-gray-300 rounded-t-md">General Infomation</button>
        </div>
        <div className="max-w-7xl overflow-y-scroll mx-auto bg-white p-9 shadow-lg z-50">
          <div className=" grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 -mt-4">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-bold text-gray-800"
              >
                Email
              </label>
              <div className="mt-2">
                <p className="text-gray-900 bg-white px-3 py-1.5 text-base block w-full rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                  {FORM_DATA.email}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3 -mt-4">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-bold text-gray-800"
              >
                Industry
              </label>
              <div className="mt-2">
                <p className="text-gray-900 bg-white px-3 py-1.5 text-base block w-full rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                  {FORM_DATA.industry}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3 -mt-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-bold text-gray-800"
              >
                Website
              </label>
              <div className="mt-2">
                <p className="text-gray-900 bg-white px-3 py-1.5 text-base block w-full rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                  {FORM_DATA.website}
                </p>
              </div>
            </div>
            <div className="sm:col-span-3 -mt-4">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-bold text-gray-900"
              >
                Tel
              </label>
              <div className="mt-2">
                <p className="text-gray-900 bg-white px-3 py-1.5 text-base block w-full rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                  {FORM_DATA.contactNumber}
                </p>
              </div>
            </div>

            <div className="col-span-full -mt-4">
              <label
                htmlFor="street-address"
                className="block text-sm/6 font-bold text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <p className="text-gray-900 bg-white px-3 py-1.5 text-base block w-full rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                  {FORM_DATA.streetAddress}
                </p>
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1 -mt-4">
              <label
                htmlFor="city"
                className="block text-sm/6 font-bold text-gray-800"
              >
                City
              </label>
              <div className="mt-2">
                <p className="text-gray-900 bg-white px-3 py-1.5 text-base block w-full rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                  {FORM_DATA.city}
                </p>
              </div>
            </div>

            <div className="sm:col-span-2 -mt-4">
              <label
                htmlFor="region"
                className="block text-sm/6 font-bold text-gray-800"
              >
                State / Province
              </label>
              <div className="mt-2">
                <p className="text-gray-800 bg-white px-3 py-1.5 text-base block w-full rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                  {FORM_DATA.region}
                </p>
              </div>
            </div>

            <div className="sm:col-span-2 -mt-4">
              <label
                htmlFor="postal-code"
                className="block text-sm/6 font-bold text-gray-800"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <p className="text-gray-800 bg-white px-3 py-1.5 text-base block w-full rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400">
                  {FORM_DATA.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrgLayout>
  );
};

export default ViewsOrg;
