import JobLayoutDashbord from '@/app/components/Dashboard/JobLayoutDashbord';

export default function Draft() {
  return (
    <JobLayoutDashbord>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Draft list</h1>
        <p>Manage and view all draft jobs.</p>
      </div>
    </JobLayoutDashbord>
  );
}
