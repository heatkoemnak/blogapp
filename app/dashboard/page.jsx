'use client';

import { BriefcaseIcon } from '@heroicons/react/20/solid';
import { MdPendingActions } from 'react-icons/md';
import { PiNewspaperClippingFill } from 'react-icons/pi';
import { MdOutlineSchedule } from 'react-icons/md';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { FaListCheck } from 'react-icons/fa6';
import { VscGitStashApply } from 'react-icons/vsc';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { RiGitPrDraftLine } from 'react-icons/ri';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import Layout from '../components/Dashboard/Layout';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import HeaderSection from '../components/ui/Reusable/HeaderSection';

function Dashboard() {
  const { data: session } = useSession();

  const cardData = [
    {
      id: 1,
      icon: <BriefcaseIcon className="w-12 h-12 text-teal-700" />,
      number: 3,
      description: 'Open Positions',
      buttonText: 'View Details',
      route: '/dashboard/open',
      role: 'employer',
    },
    {
      id: 2,
      icon: <PiNewspaperClippingFill className="w-12 h-12 text-teal-700" />,
      number: 12,
      description: 'New Applications',
      buttonText: 'Check Applications',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 3,
      icon: <MdPendingActions className="w-12 h-12 text-teal-700" />,
      number: 8,
      description: 'Pending Reviews',
      buttonText: 'Review Now',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 4,
      icon: <MdOutlineSchedule className="w-12 h-12 text-teal-700" />,
      number: 3,
      description: 'Upcoming Interviews',
      buttonText: 'View Schedule',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 5,
      icon: <BriefcaseIcon className="w-12 h-12 text-teal-700" />,
      number: 15,
      description: 'Total Hires',
      buttonText: 'View Hires',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 6,
      icon: <FaListCheck className="w-12 h-12 text-teal-700" />,
      number: 20,
      description: 'Shortlist',
      buttonText: 'View Shortlist',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 6,
      icon: <VscGitStashApply className="w-12 h-12 text-teal-700" />,
      number: 5,
      description: 'Applied',
      buttonText: 'View applications',
      route: '/dashboard/user/applied',
      role: 'candidate',
    },
    {
      id: 6,
      icon: <FaListCheck className="w-12 h-12 text-teal-700" />,
      number: 1,
      description: 'Shortlist',
      buttonText: 'View Shortlist',
      route: '/dashboard/new',
      role: 'candidate',
    },
    {
      id: 6,
      icon: <RiCalendarScheduleLine className="w-12 h-12 text-teal-700" />,
      number: 1,
      description: 'Interviews',
      buttonText: 'View Shcedules',
      route: '/dashboard/new',
      role: 'candidate',
    },
    {
      id: 6,
      icon: <AiOutlineCloseSquare className="w-12 h-12 text-teal-700" />,
      number: 2,
      description: 'Rejected',
      buttonText: 'View Rejected',
      route: '/dashboard/new',
      role: 'candidate',
    },
    {
      id: 6,
      icon: <RiGitPrDraftLine className="w-12 h-12 text-teal-700" />,
      number: 2,
      description: 'Draft',
      route: '/dashboard/new',
      buttonText: 'View Draft',
      role: 'candidate',
    },
  ];

  // useEffect(() => {
  //   if (!session) {
  //     signIn();
  //   }
  // }, [session]);

  return (
    <>
      <Layout>
        <HeaderSection title="Dashboard" />
        <div className="px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5 ">
            {cardData
              .filter((card) => card.role === session?.user?.role)
              .map((card) => (
                <div
                  key={card.id}
                  className="group w-auto min-h-40 flex flex-col hover:shadow-md justify-between items-center border border-teal-100 bg-white shadow-md rounded-lg p-4 text-teal-500"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center mb-4 text-white">
                      {card.icon}
                    </div>
                    <h5 className="text-3xl font-bold mb-2">{card.number}</h5>
                    <p className="text-lg text-teal-600">{card.description}</p>
                  </div>
                  <Link href={card.route}>
                    <button
                      className="mt-6 w-full rounded-md bg-white py-2 px-4 text-sm font-medium text-teal-600 transition-all group-hover:bg-gray-100 group-hover:shadow-md focus:ring-2 focus:ring-teal-400"
                      type="button"
                    >
                      {card.buttonText}
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
export default ProtectedRoute(Dashboard);
