import React from 'react';
import LayoutAction from './LayoutAction';
import Link from 'next/link';

function JobLayoutDashbord({ children }) {
  return (
    // <div>JobLayoutDashbord</div>
    <LayoutAction>
      {/* <div className="px-6 py-5 bg-blue-gray-50">
        <ul className="flex gap-5 ">
          <Link href="/dashboard/job.list/all">All</Link>
          <Link href="/dashboard/job.list/all">Add New Job</Link>
          <Link href="/dashboard/job.list/draft">Draft</Link>
        </ul>
      </div> */}
      <section className="flex-1 rounded-md">{children}</section>
    </LayoutAction>
  );
}

export default JobLayoutDashbord;
