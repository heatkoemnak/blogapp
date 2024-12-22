import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useDebounce } from 'use-debounce';

const Search = ({ placeholder, background }) => {
  const router = useRouter();
  const [text, setText] = useState('');
  const [query] = useDebounce(text, 500);
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query) {
      router.push(`/blogs`);
    } else {
      router.push(`/blogs?search=${query}`);
    }
  }, [query, router]);
  return (
    <div className="hidden lg:flex items-center space-x-2 bg-white py-1 px-2 rounded-full">
      <IoSearchOutline />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`outline-none w-full p-2 rounded-full ${background}`}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
