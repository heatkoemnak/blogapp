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
    <Card className="w-full">
      {jobLevelLists.map((jobLevel) => (
        <div className="py-2 rounded-xl  px-4 flex items-center w-full hover:bg-gray-50 cursor-pointer border-t border-gray-200 first:border-0">
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
    </Card>
  );
}
