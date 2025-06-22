'use client';
import React from 'react';
import LayoutAction from './LayoutAction';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const navItems = [
  {
    label: 'My Applications',
    href: '/dashboard/application/',
    role: 'candidate',
  },
  {
    label: 'All Applications',
    href: '/dashboard/application/',
    role: 'employer',
  },
  {
    label: 'New Applications',
    href: '/dashboard/application/new',
    role: 'employer',
  },
  {
    label: 'Shortlisted',
    href: '/dashboard/application/shortlist',
    role: 'employer',
  },
  {
    label: 'Rejected',
    href: '/dashboard/application/rejected',
    role: 'employer',
  },
  {
    label: 'Interview',
    href: '/dashboard/application/interview',
    role: 'employer',
  },
  { label: 'Hired', href: '/dashboard/application/hired', role: 'employer' },
];

function ApplicationDashboardLayout({ children }) {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const navItemsToShow = navItems.filter((item) => item.role === role);

  return (
    <LayoutAction>
      <section className="flex-1 rounded-md">{children}</section>
    </LayoutAction>
  );
}

export default ApplicationDashboardLayout;
