'use client';
import axios from 'axios';
import JobRow from '@/app/components/ui/jobs/JobRow';
import { useEffect, useState } from 'react';
import JobLayoutDashbord from '@/app/components/Dashboard/JobLayoutDashbord';

export default function OpeningJob() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('/api/jobs');
      if (response.data) {
        setJobs(response.data);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="mt-4">
      {jobs.length > 0 ? (
        jobs.map((job) => <JobRow key={job.id} job={job} />)
      ) : (
        <p>No open job positions available.</p>
      )}
    </div>
  );
}
