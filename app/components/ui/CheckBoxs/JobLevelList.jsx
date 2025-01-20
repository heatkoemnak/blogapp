import { jobLevelLists } from '@/app/data';
import { Chip } from '@material-tailwind/react';

export function JobLevelList() {
  return (
    <div className="w-full bg-white">
      {jobLevelLists.map((jobLevel) => (
        <label
          key={jobLevel.label}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={jobLevel.label}
            className="mr-4 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">
            {jobLevel.label}
          </span>
          <Chip
            value={jobLevel.count}
            variant="ghost"
            size="sm"
            className="rounded-full"
          />
        </label>
      ))}
    </div>
  );
}
