import Link from 'next/link';
import React from 'react';

const HeaderSection = ({ title }) => {
  return (
    <div className="relative overflow-x-auto mt-20 bg-blue-gray-50">
      <div className="px-6 py-2 bg-white rounded-t-md ">
        <ul className="flex gap-5 ">
          <Link href="/dashboard/orgs">
            <h3>{title}</h3>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default HeaderSection;
