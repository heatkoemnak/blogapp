import React from 'react';

const LatestPost = ({ post }) => {
  return (
    <>
      <div className=" w-full ">
        <div
          className=" flex-none  bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          //   style="background-image: url('/img/card-left.jpg')"
          title="Woman holding a mug"
        >
          <img
            src={
              post?.image ||
              'https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png'
            }
            alt=""
          />
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="">
            <div className="text-gray-900 text-extrabold mb-2">
              Can coffee make you a better developer?
            </div>
            {/* <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p> */}
          </div>
          <div className="flex gap-1 items-center">
            <img
              className="w-6 h-6 rounded-full"
              src={
                post?.author?.image ||
                'https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png'
              }
              alt="Avatar of Jonathan Reinink"
            />
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-900 text-sm leading-none">
                Jonathan Reinink
              </span>
              <small className="text-gray-600">Aug 18</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestPost;
