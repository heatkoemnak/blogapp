import Link from 'next/link';
import React from 'react';

const AuthButton = () => {
  return (
    <div className="flex items-center ">
      <Link
        class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 "
        href="/login"
      >
        Login or Create Account
      </Link>
    </div>
  );
};

export default AuthButton;
