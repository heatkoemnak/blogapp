import React from 'react';

const AddCommentButton = ({ newCommentText, setCommentText, session,handleKeyDown,handleCommentSubmit }) => {
  return (
    <div className="flex mb-7 mx-auto items-center justify-between w-80 p-1 border border-gray-200 rounded-3xl gap-2">
      <div className="flex items-center gap-2">
        {session?.user?.image && (
          <Image
            src={session?.user?.image}
            alt="user image"
            width={35}
            height={35}
            className="w-10 h-10 rounded-full"
          />
        )}
        <input
          onChange={(e) => setCommentText(e.target.value)}
          value={newCommentText}
          className="flex-grow text-xs font-medium text-black leading-4 focus:outline-none"
          placeholder="Type here..."
        />
      </div>
      <div className="flex items-center gap-2">
        <svg
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675"
            stroke="#9CA3AF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <button
          type="submit"
          onKeyDown={handleKeyDown}
          onClick={handleCommentSubmit}
          className="flex items-center px-3 py-2 bg-indigo-600 rounded-full shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <h3 className="px-2 text-xs font-semibold text-white leading-4">
            Send
          </h3>
        </button>
      </div>
    </div>
  );
};

export default AddCommentButton;
