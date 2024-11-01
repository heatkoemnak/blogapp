'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Comment from './Comment';

const Comments = ({ post }) => {
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post?.comments || []);

  useEffect(() => {
    setComments(post.comments || []);
  }, [post]);

  const date = new Date();

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() === '') return;
    // Assuming there's an API endpoint to post the reply
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: commentText,
          postId: post.id,
          authorEmail: session?.user?.email,
          publishedAt: formattedDate,
        }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setCommentText('');
      } else {
        console.error('Error posting reply:', await response.json());
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };
  return (
    <div className="pl-4 border rounded-md mt-2">
      <>
        <header className="flex justify-between ml-2 mr-2 items-center border-b border-grey-400">
          <Link
            href="#"
            className="cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
          >
            <Image
              src={post?.author?.image}
              className="h-9 w-9 rounded-full object-cover"
              alt={post?.author?.name}
              width={39}
              height={30}
            />
            <p className="block ml-2 font-bold">{post?.author?.name}</p>
          </Link>
          <span className="text-gray-600 text-sm font-bold">
            {post?.comments.length} Discussion
          </span>
        </header>
        <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
        {post?.comments && post?.comments?.length > 0 ? (
          post?.comments.map((comment, index) => (
            <section class="bg-white py-2 lg:py-1 " key={index}>
              <Comment comment={comment} />
            </section>
          ))
        ) : (
          <div className="flex justify-center mt-5">
            <span>This post has no comments yet.</span>
          </div>
        
        )}
        <div>
          <div className="pt-0">
            <form className="mb-6" onSubmit={handleCommentSubmit}>
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="3"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 hover:bg-primary-800"
              >
                Post comment
              </button>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default Comments;
