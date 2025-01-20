'use client';

import { useState } from 'react';
import Image from 'next/image';
import { uploadIcon } from '@/app/utils/api';
import { useSession } from 'next-auth/react';

const CompanyRegisterForm = () => {
  const { data: session } = useSession();
  const [imageSrc, setImageSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setError(null);

    let uploadedImageUrl = '';

    // Upload image if provided
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

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: companyName,
          industry,
          contactNumber,
          email,
          website,
          logoUrl: uploadedImageUrl,
          userID: session.user.id,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || 'Failed to register company');
      }

      // Success handling
      const result = await response.json();
      alert('Company registered successfully');
      console.log(result);

      // Clear form
      setCompanyName('');
      setIndustry('');
      setContactNumber('');
      setEmail('');
      setWebsite('');
      setImageSrc(null);
      setImage(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto my-10 bg-white rounded-lg shadow-lg">
      <h1 className="mb-8 font-extrabold text-4xl text-teal-700">
        Company Registration
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Company Name */}
          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border-none block mt-2"
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border-none block mt-2"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Company Website */}
          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="website"
            >
              Company Website (Optional)
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border-none block mt-2"
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://www.companywebsite.com"
            />
          </div>

          {/* Industry */}
          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="industry"
            >
              Industry
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border-none block mt-2"
              id="industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Technology, Education, Healthcare"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-500 text-lg p-4 border-none block mt-2"
              id="phone"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-full">
            <div className="w-full py-9 bg-gray-50 border border-gray-300 gap-3 grid border-dashed">
              <div className="flex w-full items-center justify-center">
                {imageSrc ? (
                  <div className="flex justify-center place-items-center rounded-lg ">
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
                        className="w-8 h-8 text-teal-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16V8m0 8v-8m5 11V5m0 16V5m5 11v-6m0 6v-6m2 9H2m14 0h6m-7 0v-9"
                        />
                      </svg>
                    </div>
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
                    <div className="flex w-28 h-9 px-2 flex-col bg-teal-700 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer">
                      {imageSrc ? 'Change icon' : 'Upload job icon'}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <aside className="bg-gray-100 p-8 rounded-lg shadow-inner">
            <h2 className="font-bold text-2xl text-teal-700">Instructions</h2>
            <ul className="list-disc mt-4 list-inside text-gray-600">
              <li>Ensure that the company name is accurate and up-to-date.</li>
              <li>
                Use a valid email address that will be used for official
                communication.
              </li>
              <li>Provide a secure password for your account.</li>
              <li>
                Include your company website and contact information for
                verification.
              </li>
              <li>
                Make sure your company complies with terms and conditions of the
                platform.
              </li>
            </ul>
          </aside>

          {/* Register Button */}
          <div className="mt-8">
            <button
              type="submit"
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-lg text-white ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Company'}
            </button>
            {error && <p className="mt-4 text-center text-red-600">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegisterForm;
