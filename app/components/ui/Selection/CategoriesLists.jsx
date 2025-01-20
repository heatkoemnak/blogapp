import React from 'react';

const CategoriesLists = () => {
  return (
    <aside
      className="w-full rounded-lg border-2 mt-4 p-4 max-w-md mx-auto"
    >
      <ul className="flex items-start flex-wrap mt-4">
        <li className="flex mx-1">
          <a
            className="p-2 px-3 
             mb-4 rounded font-medium hover:bg-transparent hover:
             border bg-teal-400/25 text-teal-500"
            href="category/all"
          >
            all
          </a>
        </li>
        <li className="flex mx-1">
          <a
            className="p-2 px-3 
             mb-4 rounded font-medium hover:bg-transparent hover:
             border bg-teal-400/25 text-teal-500"
            href="category/react-js"
          >
            react js
          </a>
        </li>
        <li className="flex mx-1">
          <a
            className="p-2 px-3 
             mb-4 rounded font-medium hover:bg-transparent hover:
             border bg-teal-400/25 text-teal-500"
            href="category/redux"
          >
            redux
          </a>
        </li>
        <li className="flex mx-1">
          <a
            className="p-2 px-3 
             mb-4 rounded font-medium hover:bg-transparent hover:
             border bg-teal-400/25 text-teal-500"
            href="category/ui-design"
          >
            ui design
          </a>
        </li>
        <li className="flex mx-1">
          <a
            className="p-2 px-3 
             mb-4 rounded font-medium hover:bg-transparent hover:
             border bg-teal-400/25 text-teal-500"
            href="category/user-experience"
          >
            user experience
          </a>
        </li>
        <li className="flex mx-1">
          <a
            className="p-2 px-3 
             mb-4 rounded font-medium hover:bg-transparent hover:
             border bg-teal-400/25 text-teal-500"
            href="category/productivity"
          >
            productivity
          </a>
        </li>
        <li className="flex mx-1">
          <a
            className="p-2 px-3 
             mb-4 rounded font-medium hover:bg-transparent hover:
             border bg-teal-400/25 text-teal-500"
            href="category/gamme"
          >
            game
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default CategoriesLists;
