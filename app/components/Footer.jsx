import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800">
      <div className="py-6 px-16 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-white text-xl">
            TA<span className="text-yellow-400">-CO</span>
          </h1>
        </div>

        <div className="flex space-x-6 mt-2">
          <i className="fa fa-dribbble text-white fa-lg"></i>
          <i className="fa fa-twitter text-white fa-lg"></i>
          <i className="fa fa-facebook text-white fa-lg"></i>
          <i className="fa fa-instagram text-white fa-lg"></i>
        </div>
      </div>

      <div className="border-t-2 mx-10 border-gray-500"></div>

      <div className="py-4 px-16 flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-white text-sm">Copyright @ 2021</h1>
        </div>

        <div>
          <a href="#" className="flex space-x-2 items-center text-white hover:text-yellow-400">
            <p className="font-semibold text-sm">GO TOP</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 -mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7l4-4m0 0l4 4m-4-4v18"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
