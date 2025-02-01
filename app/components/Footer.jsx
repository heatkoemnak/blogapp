'use client';
import Logo from './Logo';
import {
  FaFacebook,
  FaInstagramSquare,
  FaTiktok,
  FaWhatsappSquare,
} from 'react-icons/fa';
import { useBlogContext } from '../context/BlogProvider';

const Footer = () => {
  const { jobs,isLoading } = useBlogContext();
  return (
    <div className="w-full h-full -z-1">
      {/* Footer  */}
      <footer className="w-full h-fit bg-black text-white relative bottom-0">
        <div className="w-full mx-auto sm:px-10 px-4 pb-10">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-items-start pt-12">
            {/* col 1 */}
            <div className="mt-4">
              <div className="flex-1 flex justify-between items-center">
                <Logo />
              </div>
              <p className="mt-4">
                This website build by Heat Koemnak, A passionate developer,
                contributed 36 Tailwind components to this site, earning
                second-best contributor status over three months.
              </p>
              {/* Socials */}
              <div className="flex gap-2 items-center text-2xl text-white mt-6">
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
            {/* col - 2 */}
            <div className="mt-4">
              <h2 className="text-white text-3xl font-semibold mb-8">
                Latest Jobs
              </h2>
              {/* 1 */}
              {!isLoading ? (
                jobs.map((job, index) => {
                  return (
                    <div key={index} className="w-full flex flex-col mt-6">
                      <div className="w-full flex gap-4">
                        <img
                          className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]"
                          src={job?.icon}
                          alt="Gallery Image"
                        />
                        <div className="flex flex-col items-start">
                          <h3 className="xs:text-lg text-sm font-semibold">
                            {job?.title}
                          </h3>
                          <p className="text-sm text-gray-500">{job?.Company?.name}</p>
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
              <h4 className="text-white text-3xl font-semibold mb-6">
                Newsletter
              </h4>
              <p className="text-gray-300 mb-7">
                Join our subscribers list to get the latest news, updates and
                special offers directly in your inbox
              </p>
              <div className="w-full flex justify-center items-center rounded bg-gray-700">
                <input
                  type="text"
                  className="w-full h-full pl-4 text-gray-200 bg-gray-700 lg:text-left placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
                  placeholder="Email"
                />
                <button
                  type="submit"
                  className="h-full py-3 xs:px-6 px-2 bg-gradient-to-r from-orange-400 font-black to-purple-500 "
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <hr className="bg-gray mt-14" />
          <div className="w-full flex gap-2 flex-col items-center justify-center py-4">
            <div>Copyright © 2024 Power.ME All Right Reserved</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
