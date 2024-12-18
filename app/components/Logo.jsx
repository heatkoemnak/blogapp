import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={'/'}>
      {/* <h1 className="text-3xl xs:text-2xl sm:text-2xl lg:text-3xl xl:text-3xl bg-gradient-to-r from-orange-400 font-black to-purple-500 bg-clip-text text-transparent">
        Power.ME
      </h1> */}
      <h1 className="font-extrabold  text-[#201515] text-center sm:leading-none text-2xl ">
        <span className="relative  bg-clip-text text-[#201515] md:inline-block">
          PME
        </span>
        <span className="relative mt-2 bg-clip-text text-[#FF4F01]">.</span>
      </h1>
      {/* <h1 className="text-3xl xs:text-2xl sm:text-2xl lg:text-3xl xl:text-3xl bg-orange-500 font-extrabold bg-clip-text text-transparent">
        Power.ME
      </h1> */}
    </Link>
  );
};

export default Logo;
