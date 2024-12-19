'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import CreatePostForm from '../components/CreatePostForm';
const CreatePost = () => {
  const { data: session, status } = useSession();
  const [cookiesVisible, setCookiesVisible] = useState(false);

  useEffect(() => {
    if (!session) {
      signIn();
    }
    const timer = setTimeout(() => setCookiesVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [session]);

  return (
    <div className="max-w-3xl mx-auto">
      {cookiesVisible ? (
        <>
          <CreatePostForm />
        </>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-amber-500"></div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
