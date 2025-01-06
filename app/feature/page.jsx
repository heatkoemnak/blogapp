import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <>
      <div className="max-w-2xl text-center mx-auto mb-16 lg:mb-14">
        <h2 className="lg:text-6xl text-xl font-semibold md:leading-tight text-white">
          Our Features
        </h2>
        <p className="mt-1 text-gray-50 ">
          Our latest feature:How to boost your online presence with our expert
          tips and tricks
        </p>
      </div>
      <div className="relative overflow-hidden bg-white lg:pt-16 lg:pb-32 mb-20 py-5 space-y-24">
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-8 w-8 text-cyan-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      ></path>
                    </svg>
                  </span>
                </div>

                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                    You can create your blog content
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    You can create your blog content by using our smart text
                    editor, which provides you with a simple and intuitive
                    interface to write and format your blog posts.
                  </p>
                  <div className="mt-6">
                    <a
                      className="inline-flex rounded-lg bg-gray-100 px-4 py-1.5 text-base font-semibold leading-7 text-gray-800 shadow-sm ring-1 ring-orange-500 hover:bg-pink-700 hover:ring-pink-700"
                      href="/login"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <Image
                  src="https://images.unsplash.com/photo-1569144157591-c60f3f82f137"
                  alt="Description of the image"
                  width={647}
                  height={486}
                  className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-8 w-8 text-cyan-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                    Building Your Portfolio
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Create a stunning portfolio to showcase your work and
                    skills, leveraging our state-of-the-art tools to build a
                    unique and personalized presentation.
                  </p>
                  <div className="mt-6">
                    <a
                      className="inline-flex rounded-lg bg-gray-100 px-4 py-1.5 text-base font-semibold leading-7 text-gray-800 shadow-sm ring-1 ring-orange-500 hover:bg-pink-700 hover:ring-pink-700"
                      href="/login"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <Image
                  alt="Inbox user interface"
                  src="https://images.unsplash.com/photo-1599134842279-fe807d23316e"
                  width={647}
                  height={486}
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-cyan-700"
                    >
                      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                    Create Event Planning
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    The AI product can generate a plan for an event, including
                    details such as the date, time, location, and activities.
                  </p>
                  <div className="mt-6">
                    <a
                      className="inline-flex rounded-lg bg-gray-100  px-4 py-1.5 text-base font-semibold leading-7 text-gray-800 shadow-sm ring-1 ring-orange-500 hover:bg-pink-700 hover:ring-pink-700"
                      href="/login"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <Image
                  width={646}
                  height={485}
                  className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e"
                  alt="Description of the image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
