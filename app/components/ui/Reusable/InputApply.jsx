import React from 'react';
import Label from './Label';

const InputApply = ({ label, setName, type, placeholder, jobTitle }) => {
  return (
    <div className="md:grid md:grid-cols-2 bg-transparent hover:bg-gray-50 md:space-y-0  ">
      <Label labelName={label} />
      <input
        required
        type={type}
        onChange={(e) => setName(e.target.value)}
        className={`relative text-md px-4 py-3 block w-full hover:bg-gray-50  border-gray-300 ${
          jobTitle ? 'placeholder-gray-900' : 'placeholder-gray-400'
        }`}
        placeholder={jobTitle || placeholder}
      />
    </div>
  );
};

export default InputApply;
