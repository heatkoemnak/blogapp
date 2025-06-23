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
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());
function Dashboard() {
  const { data: session } = useSession();
const { data, error, isLoading } = useSWR(session?.user?.role ==='candidate' ? `/api/jobs/applications/users/${session?.user?.id}`: `/api/jobs/apply?email=${session?.user?.email}` , fetcher, {
  });
const { data: data1, error: error1, isLoading: isLoading1 } = useSWR(`/api/jobs/user/${session?.user?.email}` , fetcher, {
  });
const pendingCount = data?.filter(app =>app.status === 'public')?.length || 0;
const reviewingCount = data?.filter(app => app.status === 'reviewing')?.length || 0;
const acceptedCount = data?.filter(app => app.status === 'accepted')?.length || 0;
const rejectedCount = data?.filter(app => app.status === 'rejected')?.length || 0;
const shortlistedCount = data?.filter(app => app.status === 'shortlisted')?.length || 0;


  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!session) {
    signIn();
    return <div>Redirecting...</div>;
  }
  const cardData = [
    {
      id: 1,
      icon: <BriefcaseIcon className="w-12 h-12 text-white" />,
      number: data1?.length || 0,
      description: 'Open Positions',
      buttonText: 'View Details',
      route: '/dashboard/job.list',
      role: 'employer',
    },
    {
      id: 2,
      icon: <PiNewspaperClippingFill className="w-12 h-12 text-white" />,
      number: data?.length || 0,
      description: 'New Applications',
      buttonText: 'Check Applications',
      route: '/dashboard/application',
      role: 'employer',
    },
     {
      id: 6,
      icon: <VscGitStashApply className="w-12 h-12 text-white" />,
      number: data?.length || 0,
      description: 'Total Applied',
      buttonText: 'View applications',
      route: '/dashboard/application',
      role: 'employer',
    },
    {
      id: 3,
      icon: <MdPendingActions className="w-12 h-12 text-white" />,
      number: pendingCount,
      description: 'Pending',
      buttonText: 'Review Now',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 3,
      icon: <MdPendingActions className="w-12 h-12 text-white" />,
      number: reviewingCount,
      description: 'Reviewing',
      buttonText: 'Review Now',
      route: '/dashboard/new',
      role: 'employer',
    },

    {
      id: 6,
      icon: <FaListCheck className="w-12 h-12 text-white" />,
      number: shortlistedCount,
      description: 'Shortlist',
      buttonText: 'View Shortlist',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 4,
      icon: <MdOutlineSchedule className="w-12 h-12 text-white" />,
      number: acceptedCount,
      description: 'Upcoming Interviews',
      buttonText: 'View Schedule',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 6,
      icon: <VscGitStashApply className="w-12 h-12 text-white" />,
      number: data?.length || 0,
      description: 'Applied',
      buttonText: 'View applications',
      route: '/dashboard/application',
      role: 'candidate',
    },

    {
      id: 6,
      icon: <FaListCheck className="w-12 h-12 text-white" />,
      number: shortlistedCount,
      description: 'Shortlist',
      buttonText: 'View Shortlist',
      route: '/dashboard/new',
      role: 'candidate',
    },
    {
      id: 6,
      icon: <RiCalendarScheduleLine className="w-12 h-12 text-white" />,
      number: shortlistedCount,
      description: 'Interviews',
      buttonText: 'View Shcedules',
      route: '/dashboard/new',
      role: 'candidate',
    },
    {
      id: 6,
      icon: <AiOutlineCloseSquare className="w-12 h-12 text-white" />,
      number: rejectedCount,
      description: 'Rejected',
      buttonText: 'View Rejected',
      route: '/dashboard/new',
      role: 'candidate',
    },
    {
      id: 6,
      icon: <AiOutlineCloseSquare className="w-12 h-12 text-white" />,
      number: rejectedCount,
      description: 'Rejected',
      buttonText: 'View Rejected',
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      id: 6,
      icon: <RiGitPrDraftLine className="w-12 h-12 text-white" />,
      number: 2,
      description: 'Draft',
      route: '/dashboard/new',
      buttonText: 'View Draft',
      role: 'candidate',
    },
    {
      id: 5,
      icon: <BriefcaseIcon className="w-12 h-12 text-white" />,
      number: 0,
      description: 'Total Hires',
      buttonText: 'View Hires',
      route: '/dashboard/new',
      role: 'employer',
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
        <div className="px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
            {cardData
              .filter((card) => card.role === session?.user?.role)
              .map((card) => (
                <div
                  key={card.id}
                  className="group relative flex flex-col justify-between border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all rounded-2xl p-6 hover:scale-[1.02]"
                >
                  {/* Icon */}
                  <div className="flex justify-center items-center w-14 h-14 rounded-full bg-teal-500 text-white mb-4 text-2xl shadow-sm">
                    {card.icon}
                  </div>

                  {/* Main Content */}
                  <div className="text-center">
                    <h5 className="text-4xl font-bold text-gray-800 mb-1">{card.number}</h5>
                    <p className="text-md text-gray-600">{card.description}</p>
                  </div>

                  {/* Button */}
                  <Link href={card.route} className="mt-6">
                    <button
                      className="w-full rounded-lg bg-teal-500 py-2 px-4 text-white text-sm font-semibold hover:bg-teal-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
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
