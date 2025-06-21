'use client';
import Label from '@/app/components/ui/Reusable/Label';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlogContext } from '@/app/context/BlogProvider';
import { FaRegFilePdf } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import { uploadImage } from '@/app/utils/api';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
// import '../styles/globals.css';
import toast from 'react-hot-toast';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import InputApply from '@/app/components/ui/Reusable/InputApply';
import Processing from '@/app/components/ui/Reusable/Processing';
const Application = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(params.id);
  const { jobs } = useBlogContext();
  const [job, setJob] = useState(null);
  const inutRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [Fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState(job?.title);
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState(session?.user?.id);
  const [jobID, setJobID] = useState(params.id);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // setPDFFile(reader.result);
      setSelectedFile(file);
    };
  };
  useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session]);

  useEffect(() => {
    if (jobs && params.id) {
      const foundJob = jobs.find((company) => company.id === params.id);
      setJob(foundJob);
    }
  }, [jobs, params.id]);

  const handleRemoveFile = (e) => {
    e.preventDefault();
    inutRef.current.value = null;
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus('');
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();
    let uploadedPDF = '';
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
      );

      try {
        setUploadStatus('Uploading...');
        const imageUpload = await uploadImage(formData);
        uploadedPDF = imageUpload.secure_url;
        setUploadStatus('Done');
      } catch (error) {
        console.log(error);
        return;
      }
    }

    return uploadedPDF;
  };

  const handleApplicationSubmit = async (e, status) => {
    e.preventDefault();
    const uploadedPDF = await handleFileUpload(e); // Ensure this function is implemented
    const applicationData = {
      name: Fullname,
      position: job?.title || position,
      email: session?.user?.email || email,
      attachment: uploadedPDF,
      phone,
      status: status === 'publish' ? 'public' : 'draft',
      userID,
      jobID,
    };
    console.log(applicationData);

    await axios
      .post('/api/jobs/apply', applicationData, {
        onUploadProgress: (progressEvent) => {
          setProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      })
      .then((response) => {
        console.log('Application submitted successfully:', response.data);
        toast.success('Application submitted successfully!');
        router.push('/dashboard/application');
      })
      .catch((error) => {
        console.error('Error submitting application:', error.message);
        toast.error('Error submitting application!');
      });
  };
  if (uploadStatus === 'Uploading...') {
    <Processing state="Applying..." />;
  }
  if (uploadStatus === 'Done') {
    toast.dismiss();
    toast.success('Upload complete!');
  }
  return (
    <div className="min-h-screen border border-gray-200 flex items-center justify-center px-4 py-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-2xl border border-gray-200 bg-white w-full rounded-lg shadow-md px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-b">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 px-2 hover:bg-teal-100 py-1 rounded-full cursor-pointer text-gray-700 transition-colors"
            >
              <IoArrowBackCircleOutline size={25} />

              <span className="text-sm">Back</span>
            </button>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex flex-col text-center mt-10">
              <span className="text-xl font-medium">Applicant Information</span>
              <span className="text-sm text-gray-500 pl-2">
                Personal details and application.
              </span>
            </div>
            <div className="text-right  mt-2 rounded-lg px-5 py-2">
              <div className="text-lg font-bold">
                <Image
                  src={job?.Company?.logoUrl}
                  alt={job?.Company?.name}
                  width={50}
                  height={50}
                />
              </div>
              <div className="text-lg font-bold">{job?.Company?.name}</div>
              <p className="text-sm text-gray-500">Organization</p>
            </div>
          </div>
        </div>

        <div className="">
          <InputApply
            label="Full Name"
            setName={setFullname}
            type="text"
            placeholder="e.g., Jam Smith"
          />
          <InputApply
            label="Position"
            setName={setPosition}
            type="text"
            placeholder="e.g., Janedoe@gmail.com"
            jobTitle={job?.title}
          />
          <InputApply
            label="Email"
            setName={setEmail}
            type="email"
            placeholder="e.g., Janedoe@gmail.com"
          />
          <InputApply
            label="Phone"
            setName={setPhone}
            type="tel"
            placeholder="e.g., (123) 456-78901"
          />
          <InputApply label="Attachment" />

          <div className=" p-6 border-2 border-dashed rounded-lg text-center">
            <div className=" gap-1 mb-3">
              <div className="flex items-center text-teal-700 justify-center">
                <MdOutlineFileDownload />
                <span className="text-center text-gray-400   text-sm font-medium leading-snug">
                  Attach File
                </span>
              </div>
              <p className="text-center text-gray-400   text-xs font-normal leading-4">
                Attach up to 5 file at a time, total file size may not exceed 25
                MB
              </p>
            </div>
            <div
              className={`flex items-center justify-center ${
                selectedFile ? 'hidden' : ''
              }`}
            >
              <div className="relative mb-3 flex gap-2 items-center justify-between">
                <input
                  ref={inutRef}
                  onChange={handleFileChange}
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                  type="file"
                  id="formFile"
                />
              </div>
            </div>
          </div>

          <div
            className={`max-w-lg mx-auto gap-1 my-4 border border-teal-50 p-2 rounded-md ${
              !selectedFile ? 'hidden' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="">
                  <div className="flex items-center gap-2">
                    <FaRegFilePdf color="red" size={35} />
                    <div className="flex flex-col">
                      <span className="text-gray-900 text-md font-normal leading-snug">
                        {selectedFile?.name}
                      </span>
                      <span className="text-gray-400 text-xs font-normal leading-snug">
                        {`${(selectedFile?.size / 1024).toFixed(2)} MB`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={handleRemoveFile}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="red"
                >
                  <g id="Upload 3">
                    <path
                      id="icon"
                      d="M15 9L12 12M12 12L9 15M12 12L9 9M12 12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#D1D5DB"
                      strokeWidth="1.6"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className="relative flex items-center pt-2">
              <div className="relative w-full h-1 overflow-hidden rounded-full bg-gray-200">
                {/* <div
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div> */}
                <div>
                  <p>Uploading... {progress}%</p>
                  <progress value={progress} max="100" className="w-full" />
                </div>
              </div>
            </div>
            {uploadStatus === 'Done' ? (
              <div className="flex items-center justify-between">
                <span className="text-green-500 text-sm font-medium">
                  Upload Complete
                </span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-1 px-2 rounded-full transition duration-150"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleFileUpload}
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium py-1 px-2 rounded-full transition duration-150"
              >
                {uploadStatus === 'Uploading...' ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </div>
                ) : (
                  <span>Upload a file</span>
                )}
              </button>
            )}
          </div>
          <div className="flex  items-center  my-6 gap-1">
            <button
              type="button"
              onClick={(e) => handleApplicationSubmit(e, 'draft')}
              className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-1 px-2 rounded-full transition duration-150"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleApplicationSubmit(e, 'publish')}
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm py-1 px-2 rounded-full transition duration-150"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
