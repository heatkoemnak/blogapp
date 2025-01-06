'use client';

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Checkbox,
  Typography,
  DialogBody,
  IconButton,
  DialogHeader,
  DialogFooter,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function SelectCategoriesDialog({ ...props }) {
  const [open, setOpen] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const handleOpen = () => setOpen(!open);
  const addLink = (e) => {
    e.preventDefault();
    if (linkInput.trim() !== '') {
      props?.setLinks((prevLinks) => [...prevLinks, linkInput]);
      setLinkInput('');
    }
  };

  const removeLink = (index) => {
    props?.setLinks((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        size='sm'
        className="capitalize bg-cyan-700 font-normal text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-white"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Contacts
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            You can add more than one links
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <div className="col-span-full mx-5">
          {props?.links &&
            props.links.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700"
                >
                  {link}
                </a>
                <button
                  type="button"
                  onClick={() => removeLink(i)}
                  className="text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M6 18L18 6"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
        <div className="col-span-full ">
          <div class=" bg-slate-500 rounded-xl">
            <div class=" flex gap-2 py-2 text-sm h-10 px-3 text-gray-500 border-r border-gray-300">
              <input
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                type="text"
                class="block w-full max-w-xs pr-4 pl-20 py-2 bg-white text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                placeholder="www.Pagedone.com"
              />
              <button
                onClick={addLink}
                className="flex items-center bg-[#98c01d] p-2 text-white rounded-full "
              >
                Add links
              </button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="ml-auto" onClick={handleOpen}>
            Save Contact
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
