import React from 'react';
import LayoutAction from './LayoutAction';
import Link from 'next/link';

const CVLayout = ({ children }) => {
  return (
    <LayoutAction>
    
      <div className="px-6 py-5 bg-blue-gray-50">
        <ul className="flex gap-5 ">
          <Link href="/dashboard/user/mycv">All</Link>
          <Link href="/dashboard/user/mycv/draft">Draft</Link>
        </ul>
      </div>
      <section className="flex-1 px-10 bg-white">{children}</section>
    </LayoutAction>
  );
};

export default CVLayout;
