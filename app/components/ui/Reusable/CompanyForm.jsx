'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { uploadIcon } from '@/app/utils/api';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CompanyForm = ({ setIsOpen, setIsSuccess }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [FORM_DATA, setFORM_DATA] = useState({
    companyName: '',
    industry: '',
    contactNumber: '',
    email: '',
    website: '',
    logoUrl: '',
    userID: session?.user.id || '',
  });
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [required, setRequired] = useState({
    companyName: '',
    industry: '',
    email: '',
  });
  console.log(required);

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
    let uploadedImageUrl = '';
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
      );
      try {
        const imageUpload = await uploadIcon(formData);
        uploadedImageUrl = imageUpload.secure_url;
      } catch (error) {
        console.error(error);
        setError('Failed to upload image');
        setLoading(false);
        return;
      }
    }
    const { companyName, industry, contactNumber, email, website } = FORM_DATA;
    if (
      !companyName ||
      companyName.trim() === '' ||
      !industry ||
      industry.trim() === '' ||
      !email ||
      email.trim() === ''
    ) {
      setRequired({
        companyName: 'Please enter a company name',
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
      name: companyName,
      industry: industry,
      contactNumber: contactNumber,
      email: email,
      website: website,
      logoUrl: uploadedImageUrl,
      userID: session?.user.id || '',
    };

    try {
      await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(COMPNAY_DATA),
      });
      setIsSuccess(true);
      setLoading(false);
      setIsOpen(false);
      setRequired({});
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      toast.success('Organization added successfully');
      router.refresh();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="max-w-7xl h-screen overflow-y-scroll mx-auto bg-white p-9 shadow-lg z-50">
        <h2>Add Organization</h2>
        <form onSubmit={submitHandler} className=" border-gray-900/10">
          {/* <h2>Organization Details</h2> */}
          <div className=" grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="logo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Company Logo
              </label>
              <div className="flex items-center justify-between h-[70px]">
                <div>
                  {imageSrc ? (
                    <div className="relative group flex items-center">
                      <img
                        src={imageSrc}
                        alt="Company Logo"
                        className="w-14 h-14 border group-hover:opacity-50 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="absolute top-2  left-2 border border-red-400 bg-white w-10 h-10 flex items-center justify-center  rounded-full hover:text-red-600 text-sm text-red-500">
                          <RiDeleteBinLine onClick={() => setImageSrc(null)} />
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

                          <span className="text-gray-600 text-sm">Upload</span>
                        </label>
                        <input
                          id="upload"
                          onChange={handleFileChange}
                          type="file"
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
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Company Name
                <span className="text-red-500">
                  {required?.companyName && '*'}
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={FORM_DATA.companyName}
                  onChange={(e) =>
                    setFORM_DATA({ ...FORM_DATA, companyName: e.target.value })
                  }
                  placeholder="e.g. ABC Company"
                  className={`block w-full border-2  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 ${
                    required?.companyName
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
                  placeholder="e.g. 5VYlE@example.com"
                  className={`block w-full border-2  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 ${
                    required?.email
                      ? 'focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 border-red-300 placeholder:text-red-500'
                      : 'focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400'
                  } sm:text-sm/6`}
                />
              </div>
            </div>

            <div className="sm:col-span-4 -mt-4">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Industry
                <span className="text-red-500">
                  {required?.industry && '*'}
                </span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={FORM_DATA.industry}
                  onChange={(e) =>
                    setFORM_DATA({ ...FORM_DATA, industry: e.target.value })
                  }
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
                  autoComplete="postal-code"
                  className="block  border  w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-400 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="col-span-1 mt-4 -mb-12">
              <button
                type="submit"
                className="mt-4 hover:bg-teal-500 bg-teal-400 py-1 px-4 mr-2 text-white border border-teal-200"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 bg-gray-50 border py-1 px-4 text-gray-600 hover:bg-gray-100"
              >
                Discard
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CompanyForm;
