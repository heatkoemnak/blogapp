'use client';
import Categories from '../Categories';
import JobList from '../JobList';
import JobFilters from '../ui/jobs/JobFilters';

export default function PostLayout({ children }) {
  return (
    <>
      <Categories />

      <div className="col-span-full lg:p-10 border-b-3 border-r-4 rounded-2xl bg-cyan-50">
        <div class="container bg-light-blue-50 shadow-md mx-auto rounded-lg p-4">
          <form>
            <h1 class="text-center font-bold text-cyan-900 text-2xl md:text-4xl mb-4">
              Find the right dream job to transform your career.
            </h1>
            <div class="relative">
              <input
                type="text"
                placeholder="Job title, Keywords..."
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-cyan-500"
              />
              <button class="absolute top-0 right-0 bg-cyan-900 text-white px-4 py-2 rounded-lg">
                Search
              </button>
            </div>
          </form>
        </div>
        <JobFilters />
      </div>

      {/* <PostHeader /> */}
      <main className="mt-5">{children}</main>
    </>
  );
}
