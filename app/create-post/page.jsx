'use client';
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import FormPostJob from '../components/FormPostJob';
const CreatePost = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session]);

  return (
    <div className="max-full h-auto mx-auto ">
      <FormPostJob />
      {/* <CreatePostForm /> */}
    </div>
  );
};

export default CreatePost;
