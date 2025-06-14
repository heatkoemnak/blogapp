'use client';
import Layout from '@/app/components/Dashboard/Layout';
import JobApplications from '@/app/components/ui/jobs/newApplication';

export default function NewApplications() {
  return (
    <Layout>
      <h1 className="text-gray-700">New Applications</h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <JobApplications />
        {/* <JobApplicationsPage /> */}
      </div>
    </Layout>
  );
}
