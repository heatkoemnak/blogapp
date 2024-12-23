'use client';
import React, { useEffect, useState } from 'react';
import LatestPost from '../LatestPost';

const MostLikePost = () => {
  const [mostLikePosts, setMostLikePosts] = useState([]);

  useEffect(() => {
    const fetchPostByMostLike = async () => {
      const response = await fetch(`/api/blog/most.like`);
      const data = await response.json();
      if (response.ok) {
        setMostLikePosts(data);
      } else {
        setMostLikePosts([]);
        console.error(data.message);
      }
    };
    fetchPostByMostLike();
  }, []);

  return (
    <>
      {mostLikePosts.map((post, index) => (
        <div className="flex border my-1  " key={index}>
          <LatestPost post={post} />
        </div>
      ))}
    </>
  );
};

export default MostLikePost;
