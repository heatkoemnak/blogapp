'use client';

import Link from 'next/link';
import React from 'react';
import { Roboto } from 'next/font/google';
const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],

});
const Logo = () => {
  return (
    <Link href={'/'} passHref>
      <div className={`relative text-center ${roboto.className}`}>
        {/* <img src="https://res.cloudinary.com/dakqa3htw/image/upload/v1746697891/jobspace-logo-transparent_fqtmkv.png" alt="" width="190"/> */}
        {/* <img src="https://res.cloudinary.com/dakqa3htw/image/upload/v1746886959/jobspace-logopng_s8z7xs.png" alt="" width="120"/> */}
        <img src="https://res.cloudinary.com/dakqa3htw/image/upload/v1746889435/jobspace-high-resolution-logo-transparent_bo4hs2.png" alt="" width="60"/>
        {/* <h1
          className="font-bold text-2xl md:text-4xl lg:text-3xl xl:text-4xl tracking-tight leading-none"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-teal-500 to-teal-400">
            job
          </span>
          <span className="relative text-teal-500">Space</span>
        </h1> */}
        {/* <p className="absolute rounded-s-lg pt-[2px] px-[5px] top-[34px] bg-cyan-500 right-1 text-xs text-white">
          Cambodia
        </p> */}
      </div>
    </Link>
  );
};

export default Logo;
