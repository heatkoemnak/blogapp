'use client';

import { useState } from 'react';
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export function ChoosePostOption() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  const handleOpen = () => setOpen(!open);

  const handleNext = () => {
    if (selectedOption) {
      switch (selectedOption) {
        case 'standard':
          router.push('/company');
          break;
        case 'advertise':
          router.push('/advertisement');
          break;
        default:
          break;
      }
      setOpen(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 bg-gradient-to-r from-teal-500 via-green-400 to-teal-700 text-white font-semibold text-sm px-2 py-0 rounded-full shadow-md hover:from-teal-600 hover:to-green-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Post a Job{' '}
        <span className="ml-1 bg-white/20 px-2 py-0.5 rounded text-xs font-medium">
          Free
        </span>
      </button>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-6">
        <DialogHeader className="relative flex justify-between items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Job posting options
            </Typography>
            <Typography variant="small" className="mt-1 text-gray-500">
              Choose the type of post you’d like to create.
            </Typography>
          </div>
          <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="pt-4" style={{ fontFamily: 'Roboto' }}>
          <div className="space-y-2">
            {[
              {
                id: 'standard',
                title: 'Post a job',
                description: 'Free',
              },
              {
                id: 'advertise',
                title: 'Advertising',
                description: 'Available within 24 hours.',
              },
            ].map((option) => (
              <div key={option.id}>
                <input
                  type="radio"
                  id={option.id}
                  name="postOption"
                  value={option.id}
                  className="peer hidden"
                  required
                  onChange={handleOptionChange}
                />
                <label
                  htmlFor={option.id}
                  className="block cursor-pointer rounded-lg border bg-white p-5 hover:bg-gray-100 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:shadow-md transition duration-150 ease-in-out"
                >
                  <div className="flex justify-between items-center">
                    <Typography
                      variant="large"
                      className="mt-1 text-gray-700 font-normal"
                    >
                      {option.title}
                    </Typography>
                    <span className="text-green-400">{option.description}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </DialogBody>

        <DialogFooter className="flex justify-end space-x-3">
          <Button
            variant="outlined"
            color="red"
            onClick={handleOpen}
            className="hover:bg-red-100"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            disabled={!selectedOption}
            className="from-teal-500 to-green-700"
            onClick={handleNext}
          >
            Next
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
