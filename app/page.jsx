'use client';

import Image from 'next/image';
import Categories from './components/Categories';
import RecentPost from './components/RecentPost';
import PopularCategories from './components/PopularCategories';
import Link from 'next/link';
import Blog from './blogs/page';

export default function Home() {
  return (
    <>
      <Blog />
    </>
  );
}
