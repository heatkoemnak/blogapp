import React from 'react';

const Error = ({ error }) => {
  console.log(error);
  return (
    <div className="bg-gray-100 ">
      <div className="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM16.9497 7.05025C17.3402 7.44074 17.3402 8.07389 16.9497 8.46438L13.4142 12L16.9497 15.5356C17.3402 15.9261 17.3402 16.5593 16.9497 16.9497C16.5593 17.3402 15.9261 17.3402 15.5356 16.9497L12 13.4142L8.46438 16.9497C8.07389 17.3402 7.44074 17.3402 7.05025 16.9497C6.65976 16.5593 6.65976 15.9261 7.05025 15.5356L10.5858 12L7.05025 8.46438C6.65976 8.07389 6.65976 7.44074 7.05025 7.05025C7.44074 6.65976 8.07389 6.65976 8.46438 7.05025L12 10.5858L15.5356 7.05025C15.9261 6.65976 16.5593 6.65976 16.9497 7.05025Z"
          />
        </svg>

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {error}
          </h3>
          <p className="text-red-600 my-2">You are done with a problem.</p>
          <p> go and check again! </p>
        </div>
      </div>
    </div>
  );

};

export default Error;
