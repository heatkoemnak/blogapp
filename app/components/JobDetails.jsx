'use client';

import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';

const JobDetails = () => {
  const jobDetails = [
    {
      icon: <BriefcaseIcon className="h-4 w-4 shrink-0" />,
      label: 'Full-time',
    },
    {
      icon: <MapPinIcon className="h-4 w-4 shrink-0 text-gray-500" />,
      label: 'Location',
    },
    {
      icon: <CurrencyDollarIcon className="h-4 w-4 shrink-0 text-yellow-800" />,
      label: '$450 - $600',
    },
    { label: '15 mins ago' },
    { label: 'Additional Detail 1' }, // Add more items here for testing
    { label: 'Additional Detail 2' }, // Add more items here for testing
  ];

  return (
    <>
      <div className="mt-5">
        <div class="relative w-full min-h-[500px] overflow-hidden">
          <div class="absolute inset-0">
            <img
              src="https://www.mustgo.com/wp-content/uploads/2018/04/iStock-692910484.jpg"
              alt="დუბროვნიკი"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/0 dark:bg-black/40"></div>
          </div>

          <div class="relative w-full md:w-[600px] lg:w-[700px] p-8 md:p-12 mt-8 md:mt-12 mx-auto md:mr-8 lg:mr-12">
            <div class="bg-white/90 dark:bg-gray-800/90 p-8 rounded-lg backdrop-blur-sm">
              <div class="max-w-2xl">
                <h2 class="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                  Our Company
                </h2>

                <p class="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, repellendus.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                  <button class="bg-red-600 dark:bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition-colors">
                    Apply
                  </button>
                  <a
                    href="#"
                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center transition-colors"
                  >
                    Learn more
                    <svg
                      class="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mt-5 bg-white mx-auto p-10">
          <h1 className="text-4xl font-bold mb-8">Job Details</h1>
          <div className="flex bg-white rounded-lg p-6 items-center mb-6">
            <div className="min-w-0 flex-1">
              <div className="mt-1 flex flex-col space-y-2">
                {jobDetails.map((detail, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    {detail.icon && (
                      <div className="inline-flex items-center py-1 text-xs bg-teal-50 px-1 font-medium text-teal-700 w-fit">
                        {detail.icon}
                      </div>
                    )}
                    <span className="text-gray-700 text-sm">
                      {detail.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="font-semibold text-blue-gray-900 text-lg pt-5 pb-1 px-2">
            Job Descritpion
          </div>
          <p className="text-lg leading-8 mb-20">
            We’re hiring a Design Engineer at Tailwind Labs to build ambitious
            interfaces, prototype new ideas, and push the boundaries of what’s
            possible with Tailwind CSS. This is a fully remote position with a
            salary of $275,000 USD, open to candidates in the Eastern (UTC-5) to
            Central European (UTC+1) timezones. We’re accepting applications
            until Wednesday April 3rd at 9:00pm ET.
          </p>
          <div className="font-semibold text-blue-gray-900 text-lg pt-5 pb-1 px-2">
            Job Responsibilities
          </div>
          <p className="text-lg leading-8 mb-20">
            We’re a small team wearing many hats and you’d have a wide variety
            of responsibilities, including: Design and build ambitious marketing
            websites for our open-source projects, commercial products, and
            events like Tailwind Connect. Design and prototype new features for
            Tailwind CSS to make sure we’re always using the full potential of
            the platform. Create new components and templates for Tailwind UI,
            taking them all the way from initial concept to shipped. Enhance our
            documentation with visual demos to make it easy for people to
            understand and apply complex CSS features in their work. Teach and
            inspire our audience by breaking down interesting things you design
            and build as articles and social media posts. Build internal design
            tools to help us prototype animations, design color palettes, and
            more. Create promotional assets like animations, videos, and images
            for social media.
          </p>
          <div className="font-semibold text-blue-gray-900 text-lg pt-5 pb-1 px-2">
            Job Requirements
          </div>
          <p className="text-lg leading-8 mb-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ultricies dui ac suscipit vestibulum. Pellentesque euismod turpis
            vel sapien bibendum, non faucibus justo placerat. In hac habitasse
            platea dictumst. Morbi id tincidunt elit. Praesent consectetur
            eleifend mi, vitae gravida ante fringilla quis. Duis maximus, erat
            metus interdum eros, in rhoncus leo augue quis quam. Sed rhoncus
            consequat ipsum, vel egestas leo congue eu.
          </p>
          <div className="font-semibold text-blue-gray-900 text-lg pt-5 pb-1 px-2">
            Additional Information
          </div>
          <p className="text-lg leading-8 mb-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ultricies dui ac suscipit vestibulum. Pellentesque euismod turpis
            vel sapien bibendum, non faucibus justo placerat. In hac habitasse
            platea dictumst. Morbi id tincidunt elit. Praesent consectetur
            eleifend mi, vitae gravida ante fringilla quis. Duis maximus, erat
            metus interdum eros, in rhoncus leo augue quis quam. Sed rhoncus
            consequat ipsum, vel egestas leo congue eu.
          </p>
          <div className="font-semibold text-blue-gray-900 text-lg pt-5 pb-1 px-2">
            Benefits
          </div>
          <p className="text-lg leading-8 mb-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ultricies dui ac suscipit vestibulum. Pellentesque euismod turpis
            vel sapien bibendum, non faucibus justo placerat. In hac habitasse
            platea dictumst. Morbi id tincidunt elit. Praesent consectetur
            eleifend mi, vitae gravida ante fringilla quis. Duis maximus, erat
            metus interdum eros, in rhoncus leo augue quis quam. Sed rhoncus
            consequat ipsum, vel egestas leo congue eu.
          </p>
          <div className="font-semibold text-blue-gray-900 text-lg pt-5 pb-1 px-2">
            How to Apply
          </div>
          <p className="text-lg leading-8 mb-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ultricies dui ac suscipit vestibulum. Pellentesque euismod turpis
            vel sapien bibendum, non faucibus justo placerat. In hac habitasse
            platea dictumst. Morbi id tincidunt elit. Praesent consectetur
            eleifend mi, vitae gravida ante fringilla quis. Duis maximus, erat
            metus interdum eros, in rhoncus leo augue quis quam. Sed rhoncus
            consequat ipsum, vel egestas leo congue eu.
          </p>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
