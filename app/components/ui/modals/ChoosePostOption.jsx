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
          router.push('/post-job'); // Navigate to post-job route
          setOpen(false);
          break;
        case 'announcement':
          router.push('/announcement'); // Navigate to announcement route
          setOpen(false);
          break;
        case 'advertise':
          router.push('/advertisement'); // Navigate to advertisement route
          setOpen(false);
          break;
        default:
          break;
      }
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        variant="gradient"
        size="md"
        className="text-white bg-gradient-to-r from-teal-500 to-teal-900 border px-5 py-2 rounded-full hover:text-cyan-500"
      >
        Post a job - Free
      </button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Post options
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Please select your preferred option to post.
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
        <DialogBody>
          <div className="space-y-4">
            <div>
              <input
                type="radio"
                id="standard"
                name="postOption"
                value="standard"
                className="peer hidden"
                required
                onChange={handleOptionChange}
              />
              <label
                htmlFor="standard"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
              >
                <div className="block">
                  <Typography className="font-semibold text-2xl">
                    Post new job
                  </Typography>
                  <Typography className="font-normal font-sans text-gray-600">
                    <strong className="text-green-600">Free</strong>
                  </Typography>
                </div>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="announcement"
                name="postOption"
                value="announcement"
                className="peer hidden"
                required
                onChange={handleOptionChange}
              />
              <label
                htmlFor="announcement"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
              >
                <div className="block">
                  <Typography className="font-semibold text-2xl">
                    Announcement
                  </Typography>
                  <Typography className="font-normal text-gray-600">
                    <strong className="text-green-600">Free</strong>
                  </Typography>
                </div>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="advertise"
                name="postOption"
                value="advertise"
                className="peer hidden"
                required
                onChange={handleOptionChange}
              />
              <label
                htmlFor="advertise"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
              >
                <div className="block">
                  <Typography className="font-semibold">Advertising</Typography>
                  <Typography className="font-normal text-gray-600">
                    Available within 24 hours.{' '}
                    <strong className="text-green-600 text-xl">$5.00</strong>
                  </Typography>
                </div>
              </label>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            className="ml-auto"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            Next
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
