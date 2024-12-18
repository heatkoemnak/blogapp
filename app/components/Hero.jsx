import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import AuthButton from './ui/AuthButton';
// import Chat from './Chat';
import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <section className="sticky ">
        {/* <div className="flex justify-between">
          <Logo />
          <AuthButton />
        </div> */}
        {/* <Chat /> */}
        <div className=" mx-auto text-left md:max-w-none md:text-center">
          <div className="text-center py-4 hidden sm:block">
            <button className="bg-white border border-[#E2E8F0] hover:bg-neutral-200 text-xs font-bold py-2.5 px-4 rounded-full inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#00acee"
                width={16}
                height={16}
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              &nbsp; &nbsp;<span> Follow us on Twitter </span>
            </button>
          </div>

          <section class="bg-center lg:max-w-9xl mx-auto h-[70vh] bg-no-repeat  bg-[url('https://i.pinimg.com/originals/2e/2b/21/2e2b21aeed393403d4620367f9e093f9.gif')] bg-gray-700 bg-blend-multiply">
            <div class="px-4 mx-auto max-w-screen-xl text-center py-20">
              <h1 className="tracking-tight mb-5 leading-none font-extrabold text-[#FF4F01] text-center sm:leading-none text-4xl sm:text-5xl">
                <span className="inline md:block ">Bring your ideas </span>
                <span className="relative mt-2 bg-clip-text text-white md:inline-block">
                  to Life
                </span>
                <span className="relative mt-2 bg-clip-text text-[#FF4F01]">
                  .
                </span>
              </h1>
              {/* <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                We invest in the world’s potential
              </h1> */}
              {/* <h1 className="hidden lg:block font-extrabold text-[#FF4F01] text-center sm:leading-none text-5xl sm:text-9xl">
                <span className="inline md:block ">Bring Your Ideas </span>
                <span className="relative mt-2 bg-clip-text text-white md:inline-block">
                  to Life
                </span>
                <span className="relative mt-2 bg-clip-text text-[#FF4F01]">
                  .
                </span>
              </h1> */}
              <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                Whether {`you're`} a creator, innovator, or dreamer, our
                platform is designed to help you share your ideas with the
                world.
              </p>
              <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <a
                  href="#"
                  class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                  Get started
                  <svg
                    class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                >
                  Learn more
                </a>
              </div>
            </div>
          </section>
        </div>
        {/* <div className="max-w-lg px-4 mx-auto flex justify-center text-center md:text-center">
          <div className="flex text-center items-center lg:py-6 py-8 my-4 space-x-2  ">
            <button className="backdrop-blur-sm transition duration-500 ease-in-out bg-[#FF4F01] border border-[#E2E8F0] translate-y-1 text-white hover:bg-orange-200 text-md font-medium lg:py-3 lg:px-6 px-4 py-1 rounded-full inline-flex items-center">
              <span> Get Started</span>
            </button>
            <Link
              href={'/feature'}
              className="backdrop-blur-sm transition duration-500 ease-in-out bg-white border border-[#E2E8F0] translate-y-1 text-[#16161d] hover:bg-neutral-200 text-md font-medium lg:py-3 lg:px-6 px-4 py-1 rounded-full inline-flex items-center"
            >
              <span> Explore Features</span>
            </Link>
          </div>
        </div> */}
      </section>
      <div className="flex border-b-2 lg:flex-row flex-col p-10 rounded-3xl lg:my-20 my-5 justify-between items-center gap-10">
      
        <div className=" items-center">
          <div className=" text-center lg:text-left">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-[#201515] sm:text-5xl">
                A Platform to Empower Your Vision
              </p>
              <p className=" mt-4 text-base tracking-tight text-gray-600">
                Transform thoughts into action with intuitive tools and
                resources.
              </p>
            </div>
            <div className="flex justify-center gap-3 mt-10 lg:justify-start">
              <a
                className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
                href="#"
              >
                <span> Learn More &nbsp; → </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
