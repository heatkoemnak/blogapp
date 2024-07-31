'use client';
import CreatePostForm from '../components/CreatePostForm';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
const CreatePost = () => {
  const { status, data: session } = useSession();



  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);



  

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-bold">Create Post</h2>
      {session ? (
        <CreatePostForm />
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
