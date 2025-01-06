import { FaRegEdit } from 'react-icons/fa';
import { BiLogoBlogger } from 'react-icons/bi';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiAccountCircle2Fill } from 'react-icons/ri';
export const links = [
  {
    href: '/blogs',
    label: 'Blog',
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
  },
  {
    href: '/create-post',
    label: 'Post job',
    icon: <FaRegEdit />,
  },
];
export const jobLevelLists = [
  {
    value: 'No experience',
    count: 0,
    label: 'No Experience',
  },
  {
    value: 'Low skill',
    count: 0,
    label: 'Low Skill',
  },
  {
    value: 'Junior',
    count: 15,
    label: 'Junior Level',
  },
  {
    value: 'Mid-level',
    count: 5,
    label: 'Mid Level',
  },
  {
    value: 'Senior',
    count: 18,
    label: 'Senior Level',
  },
  {
    value: 'Manager',
    count: 1,
    label: 'Manager',
  },
  {
    value: 'Top Executive',
    count: 2,
    label: 'Top Executive',
  },
];

export const BottomNavLists = [
  {
    href: '/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
  },
  {
    href: '/blogs',
    icon: <BiLogoBlogger size={25} className="text-gray-900" />,
  },
  {
    href: '/create-post',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 text-white"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    href: '/dashboard',
    icon: <MdSpaceDashboard size={25} className="text-gray-900" />,
  },
  {
    href: '/profile',
    icon: <RiAccountCircle2Fill size={25} className="text-gray-900" />,
  },
];

// export const categoriesData = [
//   {
//     id: 1,
//     name: 'Programming',
//   },
//   {
//     id: 2,
//     name: 'Ai',
//   },
//   {
//     id: 3,
//     name: 'Technology',
//   },
//   {
//     id: 3,
//     name: 'Tips and Tricks',
//   },
// ];
// export const postData = [
//   {
//     id: 1,
//     img: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600',
//     title: 'His mother had always taught him',
//     content:
//       "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
//     categories: 'Technology',
//     reactions: {
//       likes: 192,
//       dislikes: 25,
//     },
//     links: ['https://www.google.com'],
//     views: 305,
//     userId: 121,
//   },
//   {
//     id: 2,
//     title: 'He was an expert but not in a discipline',
//     content:
//       'He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.',
//     categories: 'french',
//     img: '',
//     // img: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=600',
//     links: ['https://www.youtube.com', 'https://www.facebook.com'],
//     reactions: {
//       likes: 859,
//       dislikes: 32,
//     },
//     views: 4884,
//     userId: 91,
//   },
//   {
//     id: 3,
//     title: 'Dave watched as the forest burned up on the hill.',
//     content:
//       "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
//     categories: 'magical',
//     img: 'https://demos.creative-tim.com/material-kit-pro/assets/img/examples/card-blog2.jpg',
//     reactions: {
//       likes: 1448,
//       dislikes: 39,
//     },
//     links: ['https://www.github.com'],
//     views: 4152,
//     userId: 16,
//   },
// ];
