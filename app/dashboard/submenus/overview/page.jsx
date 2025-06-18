import LayoutAction from '@/app/components/Dashboard/LayoutAction';
import Link from 'next/link';

export default function AllJobs() {
  return (
    <LayoutAction>
      <div className="px-6 py-5 bg-blue-gray-50">
        <ul className="flex gap-5 ">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/submenus/draft">Recent Activity</Link>
        </ul>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Job Listings</h1>
        <p>Manage and view all posted jobs.</p>
      </div>
    </LayoutAction>
  );
}
