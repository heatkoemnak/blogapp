'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCategories } from '../utils/api';

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategory();
  }, [setCategories]);

  return (
    <BlogContext.Provider value={{ error, categories, setCategories }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}
