'use client';
import Logo from './Logo';
import useSWR from 'swr';

import {
  FaFacebook,
  FaInstagramSquare,
  FaTiktok,
  FaWhatsappSquare,
} from 'react-icons/fa';
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching data.');
    error.info = await res.json();
    error.status = res.status;
    console.log(error);
    throw error;
  }
  return res.json();
};
const Footer = () => {
  const { data, error, isLoading } = useSWR('/api/jobs', fetcher);

  return (
    <div className="w-full h-full -z-1 border-t-2 border-gray-50 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Footer  */}
      <footer className="w-full h-fit bg-white text-gray-600 relative bottom-0">
        <div className="w-full mx-auto sm:px-10 px-4 pb-10">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-items-center pt-12">
            {/* col 1 */}
            <div className="mt-4">
              <div className="flex-1 flex justify-end items-end">
                <Logo />
              </div>
              <p className="mt-4">
                &copy; {new Date().getFullYear()} JobHub, Inc. All Rights
                Reserved.
              </p>
            </div>
            {/* col - 2 */}
            <div className="mt-4">
              <h2 className="text-gray-600 text-3xl font-semibold mb-8">
                Latest Jobs
              </h2>
              {/* 1 */}
              {!isLoading ? (
                data?.slice(0, 2).map((job, index) => {
                  return (
                    <div key={index} className="w-full flex flex-col mt-6">
                      <div className="w-full flex gap-4">
                        <img
                          className="lg:w-[5rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]"
                          src={job?.icon}
                          alt="Gallery Image"
                        />
                        <div className="flex flex-col items-start">
                          <h3 className="xs:text-lg text-sm font-semibold">
                            {job?.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {job?.Company?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full flex flex-col mt-6 animate-pulse">
                  <div className="w-full flex gap-4">
                    <div className="bg-gray-200 rounded-sm xs:outline xs:outline-[4px] lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem]" />
                    <div className="flex flex-col items-start">
                      <h3 className="xs:text-lg text-sm font-semibold bg-gray-200 rounded-full w-[10rem] h-[1.5rem]" />
                      <p className="text-sm text-gray-500 bg-gray-200 rounded-full w-[10rem] h-[1.5rem]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* col - 4 */}
            <div className="w-full mt-4 lg:pl-6">
              <h4 className="text-gray-600 text-3xl font-semibold mb-6">
                Follow Us
              </h4>
              <div className="flex gap-2 items-center text-2xl text-teal-600 mt-6">
                <div className="flex items-center justify-center p-3 border rounded-full hover:bg-blue-500">
                  <FaFacebook />
                </div>
                <div className="flex items-center justify-center p-3 border rounded-full hover:bg-pink-500">
                  <FaInstagramSquare />
                </div>
                <div className="flex items-center justify-center p-3 border rounded-full hover:bg-green-500">
                  <FaWhatsappSquare />
                </div>
                <div className="flex items-center justify-center p-3 border rounded-full hover:bg-gray-900">
                  <FaTiktok />
                </div>
              </div>
            </div>
          </div>
          <hr className="bg-gray mt-14" />
          <div className="w-full flex gap-2 flex-col items-center justify-center py-4">
            <div>Copyright © 2024 jobSpace All Right Reserved</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
