import React from 'react';
import LayoutAction from './LayoutAction';
import Link from 'next/link';

const ProfileLayout = ({ children }) => {
  return (
    <LayoutAction>
      <div className="px-6 py-5 bg-blue-gray-50">
        <ul className="flex gap-5 list-none ">
          <Link href="/dashboard/user/mycv">My Profile</Link>
        </ul>
      </div>
      <section className="flex-1 px-5 py-5 bg-white">{children}</section>
    </LayoutAction>
  );
};

export default ProfileLayout;
// Compare this
