'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCategories, fetchPosts } from '../utils/api';

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [categories, posts] = await Promise.all([
          fetchCategories(),
          fetchPosts(),
        ]);
        setCategoryList(categories);
        setPostList(posts);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <BlogContext.Provider value={{ isLoading, errorMessage, postList, categoryList, setCategoryList }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}

