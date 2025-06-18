import React from 'react';

const Processing = ({state}) => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-blue-gray-50 dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center">
      <div className="spinner-card">
        <button className="px-4 py-2 flex group justify-center gap-2 flex-col items-center text-white rounded-lg hover:bg-teal-400 transition">
          <div className="dots-container ">
            <div className="dot bg-color  group-hover:bg-white"></div>
            <div className="dot bg-color  group-hover:bg-white"></div>
            <div className="dot bg-color  group-hover:bg-white"></div>
          </div>
          <span className='text-gray-800 group-hover:text-white'>{state}</span>
        </button>
      </div>
    </div>
  );
};

export default Processing;
