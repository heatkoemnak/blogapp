'use client';

import Image from 'next/image';
import Categories from './components/Categories';
import RecentPost from './components/RecentPost';
import PopularCategories from './components/PopularCategories';
import Link from 'next/link';
import Blog from './blogs/page';
import Hero from './components/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <Blog />
    </>
  );
}
