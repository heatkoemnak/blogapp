'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import CreatePostForm from '../components/CreatePostForm';
import Post from '../components/Post';
import { PreviewModal } from '../components/ui/modals/PreviewModal';
import FormPostJob from '../components/FormPostJob';
const CreatePost = () => {
  // const { data: session, status } = useSession();
  // console.log(session, status);
  // const [cookiesVisible, setCookiesVisible] = useState(false);

  // useEffect(() => {
  //   if (!session) {
  //     signIn();
  //   }
  //   const timer = setTimeout(() => setCookiesVisible(true), 1500);
  //   return () => clearTimeout(timer);
  // }, [session]);

  return (
    <div className="max-full h-auto mx-auto ">
      <FormPostJob />
      {/* <CreatePostForm /> */}
    </div>
  );
};

export default CreatePost;
