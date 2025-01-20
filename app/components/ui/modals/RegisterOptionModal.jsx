'use client';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RegisterOptionModal() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  const handleOpen = () => setOpen((cur) => !cur);

  const handleConfirm = () => {
    if (selectedOption === 'candidate') {
      router.push('/register/candidate'); // Redirect to Candidate register page
    } else if (selectedOption === 'employer') {
      router.push('/register.plan'); // Redirect to Employer register page
    }
    setOpen(false);
  };

  const handleOptionChange = (role) => {
    setSelectedOption(role);
  };

  return (
    <>
      <button type="button" className="text-cyan-700" onClick={handleOpen}>
        Register here
      </button>
      <Dialog size="md" open={open} handler={handleOpen} className='p-10'>
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Who are you?
            </Typography>
            <Typography color="gray" variant="paragraph">
              Choose your role
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="p-5">
          <div className="mb-6 px-5">
            <ul className="mt-3 -ml-2 flex flex-col gap-1">
              <MenuItem
                onClick={() => handleOptionChange('candidate')}
                className={`mb-4 text-center border border-gray-300 gap-3 !py-4 ${
                  selectedOption === 'candidate'
                    ? 'bg-cyan-100 border-cyan-500'
                    : ''
                }`}
              >
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  Candidate
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => handleOptionChange('employer')}
                className={`mb-4 text-center border border-gray-300 gap-3 !py-4 ${
                  selectedOption === 'employer'
                    ? 'bg-cyan-100 border-cyan-500'
                    : ''
                }`}
              >
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  Employer
                </Typography>
              </MenuItem>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={handleConfirm}
            disabled={!selectedOption}
          >
            Confirm
          </Button>
          <div className="text-xs text-blue-gray-400">
            You will be redirected to the Sign-Up page
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
