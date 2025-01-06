'use client';

import { useBlogContext } from '@/app/context/BlogProvider';
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
} from '@material-tailwind/react';

export function MoreCategories() {
  const { categoryList, isLoading } = useBlogContext();

  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button  className="capitalize font-medium text-sm">
          More
        </Button>
      </MenuHandler>
      <MenuList>
        <Input
          label="Search"
          containerProps={{
            className: 'mb-4',
          }}
        />
        {isLoading && (
          <div className="flex justify-center items-center ">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
        {categoryList?.map((category) => (
          <MenuItem key={category.id}>{category.name}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
