'use client';

import React from 'react';
import { IconButton, ButtonGroup } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export function PaginationJob() {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    className: active === index ? 'bg-gray-100 text-gray-900' : '',
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex">
      <button
        onClick={handlePrev}
        className="absolute left-4 lg:bottom-0 -bottom-10 z-50  flex items-center lg:bg-transparent bg-blue-700  text-white px-3 py-1 rounded-full  hover:bg-blue-700 transition"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        Prev
      </button>
      <button
        onClick={handleNext}
        className="absolute flex items-center right-4 lg:bottom-0 -bottom-10 z-50 lg:bg-transparent bg-blue-700  text-white px-3 py-1 rounded-full  hover:bg-blue-700 transition"
      >
        Next
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
    // <ButtonGroup variant="outlined" color="blue">
    //   <IconButton>
    //     <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
    //   </IconButton>
    //   <IconButton {...getItemProps(1)}>1</IconButton>
    //   <IconButton {...getItemProps(2)}>2</IconButton>
    //   <IconButton {...getItemProps(3)}>3</IconButton>
    //   <IconButton {...getItemProps(4)}>4</IconButton>
    //   <IconButton {...getItemProps(5)}>5</IconButton>
    //   <IconButton onClick={next}>
    //     <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
    //   </IconButton>
    // </ButtonGroup>
  );
}
