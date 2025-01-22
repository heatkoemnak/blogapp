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
    <input
      value={text}
      type="search"
      name="search"
      onChange={(e) => setText(e.target.value)}
      placeholder="job title, keywords..."
      className="p-4 pl-10 text-gray-600 rounded w-full border-gray-100"
    />
  );
};

export default Search;
