'use client';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PDFUpload from './PDFUpload';

export default function PDFUploader() {
  const [matchedJobs, setMatchedJobs] = useState(null);

  return (
    <div className="min-h-3xl bg-color py-12 px-4 sm:px-6 lg:px-8">
     

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Job Matching System
          </h1>
          <p className="text-gray-200">
            Upload your resume and {`we'll`} match you with the best job
            opportunities
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <PDFUpload setMatchedJobs={setMatchedJobs} />
        </div>

        {matchedJobs && (
          <div className="bg-white shadow rounded-lg p-3">
            <h2 className="text-xl font-semibold mb-4">Your Job Matches</h2>
            <div className="space-y-2">
              {matchedJobs.map((job) => (
                <div key={job.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-100 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
