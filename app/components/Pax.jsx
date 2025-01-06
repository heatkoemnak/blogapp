'use client';


import { ChevronDownIcon } from '@heroicons/react/16/solid';

export default function Pax({ pax, setPax }) {
  return (
    <div className="my-3 w-full">
      <label htmlFor="Pax" className="block text-sm/6 font-medium text-white">
        Number of pax
      </label>
      <div className="flex gap-2 items-center bg-white rounded-md pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600">
        <input
          value={pax}
          type="number"
          placeholder="e.g., 1"
          onChange={(e) => setPax(e.target.value)}
          className="w-full py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none"
        />
        <div className="shrink-0 text-base px-5 text-gray-500 sm:text-sm/6">pax</div>
      </div>
    </div>
  );
}
