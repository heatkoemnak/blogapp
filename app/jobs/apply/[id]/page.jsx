'use client';
import Label from '@/app/components/ui/Reusable/Label';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlogContext } from '@/app/context/BlogProvider';
import { FaRegFilePdf } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import { uploadImage } from '@/app/utils/api';
import { useSession } from 'next-auth/react';
import { se } from 'date-fns/locale';
import axios from 'axios';

const Application = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(params.id);
  const { jobs } = useBlogContext();
  const [job, setJob] = useState(null);
  // const [pdfFile, setPDFFile] = useState(null);
  const inutRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const [Fullname, setFullname] = useState('');
  const [applicationFor, setApplicationFor] = useState(job?.title);
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
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

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedPDF = await handleFileUpload(e);
      await axios.post(
        '/api/jobs/apply',
        {
          Fullname,
          applicationFor: job?.title || applicationFor,
          email: session?.user?.email || email,
          attachment: uploadedPDF,
          about,
          userID,
          jobID,
        },
        {
          onUploadProgress: (progressEvent) => {
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }
      );
    } catch (error) {
      console.log('Error uploading file:', error.message);
    }
  };

  return (
    <div class="min-h-screen border border-gray-200 flex items-center justify-center px-4 py-10">
      <div class="max-w-4xl border border-gray-200 bg-white w-full rounded-lg shadow-md px-4 sm:px-6 lg:px-8">
        <div class="py-9 border-b">
          <button
            onClick={() => router.back()}
            className="flex gap-1  bg-teal-700 px-2 rounded-full items-center cursor-pointer text-white hover:text-white hover:bg-teal-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span>Back</span>
          </button>
          <div className="flex justify-between items-center ">
            <div>
              <h2 class="text-2xl ">Applicant Information</h2>
              <p class="text-sm text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div>
              <div>{job?.title}</div>
              <p class="text-sm text-gray-500">
                Fields marked with * are required.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="md:grid md:grid-cols-2 bg-transparent hover:bg-gray-50 md:space-y-0  border-b">
            <Label labelName="Full name" />
            <input
              required
              type="text"
              onChange={(e) => setFullname(e.target.value)}
              className="relative block w-full px-4 py-3 text-md hover:bg-gray-50   text-gray-600 placeholder-gray-400"
              placeholder="e.g., Heat Koemnak"
            />
            {/* <p>Jane Doe</p> */}
          </div>
          <div class="md:grid md:grid-cols-2 bg-transparent hover:bg-gray-50  md:space-y-0  border-b">
            <div class="flex items-center space-x-2">
              <Label labelName="Application for" />
            </div>
            <input
              required
              type="text"
              value={job?.title || applicationFor}
              onChange={(e) => setApplicationFor(e.target.value)}
              className={`relative text-md px-4 py-3 block w-full hover:bg-gray-50  border-gray-300 ${
                job?.title ? 'placeholder-gray-900' : 'placeholder-gray-400'
              }`}
              placeholder={`e.g., ${job?.title}`}
            />
          </div>
          <div class="md:grid md:grid-cols-2 bg-transparent hover:bg-gray-50 md:space-y-0   border-b">
            <Label labelName="Email Address" />
            <input
              required
              type="email"
              value={session?.user.email}
              onChange={(e) => setEmail(e.target.value)}
              className={` relative text-md px-4 py-3 block w-full hover:bg-gray-50   border-gray-300  text-gray-600 focus:border-teal-500 placeholder-gray-400`}
              placeholder="e.g., Janedoe@gmail.com"
            />
          </div>

          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0   border-b">
            <p class="text-gray-600">Message</p>
            <div className="relative ">
              {/* <Textarea variant="static" placeholder="Your Comment" rows={8} /> */}
              <textarea
                rows="8"
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write your cover letter here"
                className="relative text-md px-4 py-3 mr-2 hover:bg-gray-50  block w-full  border-gray-300  text-gray-600 focus:border-teal-500 placeholder-gray-400"
              ></textarea>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:space-y-0 space-y-1 ">
            <p class="text-gray-600 p-4">Attachments</p>
          </div>
          <div class=" gap-1 mb-3">
            <div class="flex items-center text-teal-700 justify-center">
              <MdOutlineFileDownload />
              <span class="text-center text-gray-400   text-sm font-medium leading-snug">
                Attach File
              </span>
            </div>
            <p class="text-center text-gray-400   text-xs font-normal leading-4">
              Attach up to 5 file at a time, total file size may not exceed 25
              MB
            </p>
          </div>

          <div
            className={`flex items-center justify-center ${
              selectedFile ? 'hidden' : ''
            }`}
          >
            <div class="relative mb-3 flex gap-2 items-center justify-between">
              <input
                ref={inutRef}
                onChange={handleFileChange}
                class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                type="file"
                id="formFile"
              />
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
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className="relative flex items-center pt-2">
              <div className="relative w-full h-1 overflow-hidden rounded-3xl bg-gray-900">
                <div
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  className="w-full flex h-full items-center justify-center bg-teal-600 text-white rounded-3xl"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            {uploadStatus && (
              <div className="flex items-center justify-between">
                <span className="text-green-500 text-sm font-normal leading-snug">
                  {progress} %{uploadStatus}
                </span>
              </div>
            )}`
            {selectedFile && (
              <label
                for="formFile"
                class="justify-start mt-2 flex text-sm font-medium text-white"
              >
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className=" bg-teal-500 flex cursor-pointer flex-col items-center gap-4 rounded border border-dashed border-slate-300 px-3 py-2 text-center text-sm font-medium transition-colors"
                >
                  Upload a file
                </button>
              </label>
            )}
          </div>
          <div className="flex w-full items-center justify-end">
            <button
              type="button"
              onClick={handleApplicationSubmit}
              className="bg-teal-500 hover:bg-cyan-700 text-white font-bold my-6 py-2 px-4 rounded "
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
