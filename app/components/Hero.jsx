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
        <div className="max-w-lg px-4 sm:pt-24 pt-12  mx-auto text-left md:max-w-none md:text-center">
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
          <h1 className="font-extrabold leading-10 tracking-tight text-[#201515] text-center sm:leading-none text-5xl sm:text-9xl">
            <span className="inline md:block leading-[1]">
              Bring Your Ideas{' '}
            </span>
            <span className="relative mt-2 bg-clip-text text-[#201515] md:inline-block">
              to Life
            </span>
            <span className="relative mt-2 bg-clip-text text-[#FF4F01]">.</span>
          </h1>
          <p className=" text-center mt-4 font-medium lg:text-xl max-w-4xl mx-auto  text-gray-600">
            Whether {`you're`} a creator, innovator, or dreamer, our platform is
            designed to help you share your ideas with the world.
          </p>
        </div>
        <div className="max-w-lg px-4 mx-auto flex justify-center text-center md:text-center">
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
        </div>
      </section>
      <div className="flex lg:flex-row flex-col p-10 rounded-3xl lg:my-20 my-5 justify-between items-center gap-10 bg-gradient-to-r from-red-200 to-orange-200 ">
        <div className=" ">
          <Image
            className="object-cover rounded-3xl object-center w-full mx-auto bg-gray-300 lg:ml-auto"
            alt="hero"
            width={600}
            height={600}
            src="https://i.pinimg.com/originals/2e/2b/21/2e2b21aeed393403d4620367f9e093f9.gif"
          />
        </div>
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
