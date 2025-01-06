import {
  ListItemSuffix,
  Chip,
  Card,
} from '@material-tailwind/react';

export function CountByCategories() {
  return (
    <Card className="w-52">
      <div className="py-2 rounded-xl  px-4 flex items-center w-full hover:bg-gray-50 cursor-pointer border-t border-gray-200 first:border-0">
        <span className="flex-1 text-gray-900 text-base"> Full-time jobs</span>
        <ListItemSuffix>
          <Chip value="14" variant="ghost" size="sm" className="rounded-full" />
        </ListItemSuffix>
      </div>
      <div className="py-2 rounded-xl  px-4 flex items-center w-full hover:bg-gray-50 cursor-pointer border-t border-gray-200 first:border-0">
        <span className="flex-1 text-gray-900 text-base">Part-time jobs</span>
        <ListItemSuffix>
          <Chip value="14" variant="ghost" size="sm" className="rounded-full" />
        </ListItemSuffix>
      </div>
      <div className="py-2 rounded-xl  px-4 flex items-center w-full hover:bg-gray-50 cursor-pointer border-t border-gray-200 first:border-0">
        <span className="flex-1 text-gray-900 text-base">Temporary jobs</span>
        <ListItemSuffix>
          <Chip value="14" variant="ghost" size="sm" className="rounded-full" />
        </ListItemSuffix>
      </div>
    </Card>
  );
}
