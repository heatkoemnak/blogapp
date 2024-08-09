'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCategories, fetchPosts } from '../utils/api';

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const cateData = await fetchCategories();
        const postData = await fetchPosts();
        setPosts(postData);
        setCategories(cateData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <BlogContext.Provider value={{loading, error,posts, categories, setCategories }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}
