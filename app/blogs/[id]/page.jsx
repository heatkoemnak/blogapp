'use client';

import Post from '@/app/components/Post';
import { useEffect, useState } from 'react';

const BlogDetails = ({ params }) => {
  const { id } = params;

  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          throw new Error('No posts created');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  console.log(id);
  return (
    <div>
      {post && <Post post={post} />}
    </div>
  );
};

export default BlogDetails;
