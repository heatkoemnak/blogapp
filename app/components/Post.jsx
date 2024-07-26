// pages/index.js
import React from 'react';
import { postData } from '../data'; // Adjust the path if needed
import PostList from './PostList';

const Post = () => {
  return (
    <div>
      <h1 className='font-bold py-6'>Posts</h1>
      <PostList posts={postData} />
    </div>
  );
};

export default Post;