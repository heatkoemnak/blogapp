'use client';

import Link from 'next/link';
import Sponsorship from './Sponsorship';

const Hero = () => {
  return (
    <>
      <main class=" bg-blue-gray-400">
        <section class="relative bg-gradient-to-br from-blue-900 to-indigo-800 text-white overflow-hidden">
          <div class="absolute inset-0 bg-black opacity-50"></div>
          <div
            class="absolute top-0 inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
            }}
            // style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');"
          ></div>

          <div class="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div class="flex flex-col md:flex-row items-center justify-between">
              <div class="w-full md:w-1/2 mb-12 md:mb-0">
                <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Welcome to jobSpace
                </h1>
                <p class="text-xl mb-8 text-gray-300">
                  Unlock your potential with jobSpace and find your dream job.
                </p>
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="#"
                    class="bg-white text-teal-800 font-semibold px-8 py-3 rounded-full hover:bg-blue-100 transition duration-300 text-center"
                  >
                    Go for it
                  </a>
                  <a
                    href="#"
                    class="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-teal-800 hover:text-white transition duration-300 text-center"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div class="w-full md:w-1/2 md:pl-12">
                <div class="bg-teal-900 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
                  <h2 class="text-2xl font-semibold mb-6">Why jobSpace?</h2>
                  <ul class="space-y-4">
                    <li class="flex items-center">
                      <svg
                        class="w-6 h-6 mr-3 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                      <span> Streamlined Application Process</span>
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="w-6 h-6 mr-3 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>

                      <span>User-friendly Interface</span>
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="w-6 h-6 mr-3 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        ></path>
                      </svg>
                      <span>AI-powered Insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>
      </main>
      <Sponsorship />
    </>
  );
};

export default Hero;
