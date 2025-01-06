import Link from 'next/link';
import React from 'react';
import { Comfortaa } from 'next/font/google';

const inter = Comfortaa({ subsets: ['latin'], weight: ['500'] });

const Logo = () => {
  return (
    <Link href={'/'} passHref>
      <div className={`relative text-center ${inter.className}`}>
        <h1 className="font-extrabold text-2xl text-center sm:text-4xl md:text-5xl lg:text-4xl tracking-tight leading-none">
          <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-cyan-400  to-[#004953]">
            Job
          </span>
          <span className="relative text-cyan-800">Space</span>
          <span className="text-3xl text-blue-600 tracking-tight absolute -top-2 -right-2">
            .
          </span>
        </h1>
        <p className="absolute rounded-s-lg pt-[2px] px-[5px] top-[34px] bg-cyan-500 right-1 text-xs text-white">
          Cambodia
        </p>
      </div>
    </Link>
  );
};

export default Logo;
