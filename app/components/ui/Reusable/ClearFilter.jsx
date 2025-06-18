import React from 'react';
import { MdOutlineClearAll } from 'react-icons/md';

const ClearFilter = ({handleClear}) => {
  return (
    <button
      type="button"
      onClick={handleClear}
      className="flex items-center gap-1 font-semibold text-red-600 text-sm pt-5 px-2"
    >
      <MdOutlineClearAll size={20} />
      <span>Clear</span>
    </button>
  );
};

export default ClearFilter;
