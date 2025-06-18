'use client';
import JobLayoutDashbord from '@/app/components/Dashboard/JobLayoutDashbord';
import JobRow from '@/app/components/ui/jobs/JobRow';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Applied = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/apply`);
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }
        const data = await response.json();
        setJobs(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <JobLayoutDashbord>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </JobLayoutDashbord>
    );
  }

  if (error) {
    return (
      <JobLayoutDashbord>
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </JobLayoutDashbord>
    );
  }

  return (
    <JobLayoutDashbord>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Applied Jobs</h2>
        {jobs.length > 0 ? (
          jobs.map((app, index) => (
            <div key={index}>
              <JobRow job={app?.Job} appId={app?.jobID} />
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </JobLayoutDashbord>
  );
};

export default Applied;
