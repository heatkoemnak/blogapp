import Label from '@/app/components/ui/Reusable/Label';
import React from 'react';

const Application = () => {
  return (
    <div class="min-h-screen flex items-center justify-center px-4 py-10">
      <div class="max-w-5xl  bg-white w-full rounded-lg shadow-xl px-5">
        <div class="p-4 border-b">
          <h2 class="text-2xl ">Applicant Information</h2>
          <p class="text-sm text-gray-500">Personal details and application.</p>
        </div>

        <div>
          <div class="md:grid md:grid-cols-2 bg-transparent hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <Label labelName="Full name" />
            <input
              required
              type="text"
              className={` relative  px-4 py-3 block w-full  border-gray-300  text-gray-600 text-md  focus:border-teal-500 placeholder-gray-400`}
              placeholder="e.g., Heat Koemnak"
            />
            {/* <p>Jane Doe</p> */}
          </div>
          <div class="md:grid md:grid-cols-2 bg-transparent hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <Label labelName="Application for" />
            <input
              required
              type="text"
              className={` relative text-md px-4 py-3 block w-full  border-gray-300  text-gray-600 focus:border-teal-500 placeholder-gray-400`}
              placeholder="e.g., Product Manager"
            />
            {/* <p>Product Manager</p> */}
          </div>
          <div class="md:grid md:grid-cols-2 bg-transparent hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <Label labelName="Email Address" />
            <input
              required
              type="email"
              className={` relative text-md px-4 py-3 block w-full  border-gray-300  text-gray-600 focus:border-teal-500 placeholder-gray-400`}
              placeholder="e.g., Janedoe@gmail.com"
            />
          </div>

          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">Message</p>
            <div className="relative ">
              {/* <Textarea variant="static" placeholder="Your Comment" rows={8} /> */}
              <textarea
                rows="5"
                placeholder="Write your cover letter here"
                className="relative text-md px-4 py-3 mr-2 block w-full  border-gray-300  text-gray-600 focus:border-teal-500 placeholder-gray-400"
              ></textarea>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
            <p class="text-gray-600">Attachments</p>
            <div class="space-y-2">
              <div class="border-2 flex items-center p-2 rounded justify-between space-x-2">
                <div class="space-x-2 truncate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current inline text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" />
                  </svg>
                  <span>resume_for_manager.pdf</span>
                </div>
                <a href="#" class="text-purple-700 hover:underline">
                  Download
                </a>
              </div>

              <div class="border-2 flex items-center p-2 rounded justify-between space-x-2">
                <div class="space-x-2 truncate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current inline text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" />
                  </svg>
                  <span>resume_for_manager.pdf</span>
                </div>
                <a href="#" class="text-purple-700 hover:underline">
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://www.buymeacoffee.com/danimai"
        target="_blank"
        class="bg-purple-600 p-2 rounded-lg text-white fixed right-0 bottom-0"
      >
        Support me
      </a>
    </div>
  );
};

export default Application;
