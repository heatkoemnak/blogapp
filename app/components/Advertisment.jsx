import React from 'react';

const Advertisment = () => {
  return (
    <div className="sm:col-span-12 lg:col-span-3 p-5">
      <a href="#">
        <div
          className="h-48 w-auto  bg-cover text-center overflow-hidden"
          style={{
            backgroundImage: "url('https://tailwindcss.com/img/card-left.jpg')",
          }}
          title="Woman holding a mug"
        ></div>
      </a>
      <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <div>
          <a
            href="#"
            className="text-xs text-indigo-600 uppercase font-medium flex items-center hover:text-gray-900 transition duration-500 ease-in-out"
          >
            Fashion
          </a>
          <a
            href="#"
            className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 transition duration-500 ease-in-out"
          >
            The perfect summer sweater that you can wear!
          </a>
          <p className="text-gray-700 text-xs mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Advertisment;
