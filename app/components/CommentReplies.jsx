'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import SingleReply from './SingleReply';

const CommentReplies = ({ comment, showFieldReply }) => {
  const { data: session } = useSession();
  console.log(comment);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState(comment?.replies || []);
  const [showReply, setShowReply] = useState(false);

  const date = new Date();

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  console.log(formattedDate);
  const handleReplySubmit = () => {
    if (replyText.trim() === '') return;

    // Assuming there's an API endpoint to post the reply
    
    fetch('/api/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: replyText,
        commentId: comment.id,
        authorEmail: session?.user?.email,
        publishedAt: formattedDate,
      }),
    })
      .then((response) => response.json())
      .then((newReply) => {
        setReplies([...replies, newReply]);
        setReplyText(''); // Clear the input field
      })
      .catch((error) => {
        console.error('Error posting reply:', error);
      });
  };

  return (
    <>
      {replies.map((reply, index) => (
        <SingleReply reply={reply} key={index} showReply={showReply} setShowReply={setShowReply}/>
      ))}
      <div>
        {showReply && (
          <div className="mt-4 ml-11">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Write a reply..."
            />
            <button
              onClick={handleReplySubmit}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Reply
            </button>
          </div>
        )}
      </div>
      {showFieldReply && (
        <div className="mt-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Write a reply..."
          />
          <button
            onClick={handleReplySubmit}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Post Reply
          </button>
        </div>
      )}
    </>
  );
};

export default CommentReplies;
