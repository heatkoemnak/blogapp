'use client';
import CreatePostForm from '../components/CreatePostForm';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
const CreatePost = () => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status !== 'authenticated' && !data) {
      redirect('/login');
    }
  }, [status, data]);
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-bold">Create Post</h2>
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
