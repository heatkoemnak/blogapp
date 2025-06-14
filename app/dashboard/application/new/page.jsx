import ApplicationDashboardLayout from '@/app/components/Dashboard/ApplicationDashboardLayout';
import NewApplications from '@/app/components/ui/jobs/newApplication';
import React from 'react';

const page = () => {
  return (
    <ApplicationDashboardLayout>
      <div className="w-full py-4">
        <h2 className="text-blue-gray-900">New Applications</h2>
        <hr />
      </div>
      <NewApplications />
    </ApplicationDashboardLayout>
  );
};

export default page;
