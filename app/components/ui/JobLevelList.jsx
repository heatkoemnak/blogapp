import { jobLevelLists } from '@/app/data';
import {
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Card,
} from '@material-tailwind/react';

export function JobLevelList() {
  return (
    <div className="w-full bg-white py-5  ">
      {jobLevelLists.map((jobLevel) => (
        <div key={jobLevel.label} className="py-2 px-4 flex items-center w-full hover:bg-gray-50 cursor-pointer ">
          <span className="flex-1 text-gray-900 text-base">
            {jobLevel.label}
          </span>
          <ListItemSuffix>
            <Chip
              value={jobLevel.count}
              variant="ghost"
              size="sm"
              className="rounded-full"
            />
          </ListItemSuffix>
        </div>
      ))}
    </div>
  );
}
