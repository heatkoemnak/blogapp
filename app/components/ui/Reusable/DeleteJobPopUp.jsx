'use client';

import { useState } from 'react';

const DeleteJobPopUp = ({
  jobName,
  handleDelete,
  loading,
  jobId,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 text-white bg-red-600 rounded-md"
      >
        Delete
      </button>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold">{jobName}</h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete this job?
            </p>
            {/* {error && <p className="text-red-600">{error}</p>} */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  handleDelete(jobId);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteJobPopUp;
