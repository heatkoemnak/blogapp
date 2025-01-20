import { ListItemSuffix, Chip, Card } from '@material-tailwind/react';
import { JOBTypes } from '@/app/data';

export function CountByCategories() {
  return (
    <div className="w-full bg-white">
      {JOBTypes.map((type) => (
        <label
          key={type.id}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={type.label}
            className="mr-4 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">{type.label}</span>
          <Chip
            value={type.count}
            variant="ghost"
            size="sm"
            className="rounded-full"
          />
        </label>
      ))}
    </div>
  );
}
