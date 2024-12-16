import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={'/'}>
      <h1 className="text-3xl xs:text-2xl sm:text-2xl lg:text-3xl xl:text-3xl bg-gradient-to-r from-orange-400 font-black to-purple-500 bg-clip-text text-transparent">
        Power.ME
      </h1>
    </Link>
  );
};

export default Logo;
