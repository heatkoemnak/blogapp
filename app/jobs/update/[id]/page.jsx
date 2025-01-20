'use client';
import { useEffect, useState } from 'react';
import UpdatePostForm from '@/app/components/UpdatePostForm';
import LoadingSpinner from '@/app/components/LoadingSpinner';

const EditBlog = ({ params }) => {
  const { id } = params;
  console.log(id);
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch the post');
        }
        const data = await response.json();
        if (data) {
          setPost(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  return <div>{post && <UpdatePostForm post={post} />}</div>;
};

export default EditBlog;
