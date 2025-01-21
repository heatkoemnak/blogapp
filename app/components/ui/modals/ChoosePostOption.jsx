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
        case 'announcement':
          router.push('/announcement');
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
        className="text-white bg-gradient-to-r from-teal-400 to-teal-700 px-5 py-2 rounded-full hover:shadow-lg hover:from-teal-500 hover:to-teal-800"
      >
        Post a Job - Free
      </button>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-6">
        <DialogHeader className="relative flex justify-between items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Select Post Option
            </Typography>
            <Typography variant="small" className="mt-1 text-gray-500">
              Choose the type of post you’d like to create.
            </Typography>
          </div>
          <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="pt-4">
          <div className="space-y-2">
            {[
              {
                id: 'standard',
                title: 'Post a job',
                description: 'Free',
              },
              {
                id: 'announcement',
                title: 'Announcement',
                description: 'Free',
              },
              {
                id: 'advertise',
                title: 'Advertising',
                description: 'Available within 24 hours. $5.00',
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
                    <span className="text-gray-900 text-lg font-semibold">
                      {option.title}
                    </span>
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
