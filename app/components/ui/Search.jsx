'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

const Search = () => {
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
      router.push(`/jobs`);
    } else {
      router.push(`/jobs?search=${query}`);
    }
  }, [query, router]);
  return (
    <div className="flex max-w-xl mx-auto py-10">
      <input
        value={text}
        type="search"
        name="search"
        onChange={(e) => setText(e.target.value)}
        placeholder="job title, keywords..."
        className="p-4 pl-10 text-gray-600  w-full border-gray-100 border-2 outline-none focus:border-cyan-900"
      />
      <button className='p-4 bg-cyan-900 text-white'>Seach</button>
    </div>
  );
};

export default Search;
