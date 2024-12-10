import React from 'react';
import Logo from './Logo';
import { FaFacebook, FaInstagramSquare, FaTiktok, FaWhatsappSquare } from 'react-icons/fa';

const Footer = () => {
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
                This website build by Heat Koemnak, A passionate developer, contributed 36 Tailwind
                components to this site, earning second-best contributor
                status over three months.
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
                Latest News and Blogs
              </h2>
              {/* 1 */}
              <div className="w-full flex flex-col mt-6">
                <div className="w-full flex gap-4">
                  <img
                    className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]"
                    src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Gallery Image"
                  />
                  <div className="flex flex-col items-start">
                    <h3 className="xs:text-lg text-sm font-semibold">
                      AI-Powered Chips Revolutionize Cloud Computing
                    </h3>
                    <p className="text-sm text-gray-500">Nov 17, 2024</p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="w-full flex flex-col mt-6">
                <div className="w-full flex justify-start gap-4">
                  <img
                    className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]"
                    src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Gallery Image"
                  />
                  {/* <img class="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]" src="https://images.unsplash.com/photo-1536408745983-0f03be6e8a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHx0ZXNsYSUyMHNvbGFyJTIwcm9vZnxlbnwwfDB8fHwxNzMxODI5MDA0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image" /> */}
                  <div className="flex flex-col items-start">
                    <h3 className="xs:text-lg text-sm font-semibold">
                      Tesla Unveils Solar Roofs 3.0: Efficiency Boost of 20%
                    </h3>
                    <p className="text-sm text-gray-500">Nov 17, 2024</p>
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="w-full flex flex-col mt-6">
                <div className="flex justify-start gap-4">
                  <img
                    className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]"
                    src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Gallery Image"
                  />
                  {/* <img class="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]" src="https://images.unsplash.com/photo-1684487747720-1ba29cda82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxvcGVuJTIwYWl8ZW58MHwwfHx8MTczMTgyOTA4M3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image" /> */}
                  <div className="flex flex-col gap-2 items-start">
                    <h3 className="xs:text-lg text-sm font-semibold">
                      OpenAI Releases GPT-5 with Enhanced Creativity Features
                    </h3>
                    <p className="text-sm text-gray-500">Nov 17, 2024</p>
                  </div>
                </div>
              </div>
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
