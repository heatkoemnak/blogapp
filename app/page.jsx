'use client';

import Hero from './components/Hero';
import LandingSearch from './components/LandingSearch';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingSearch />
      <Hero />
    </>
  );
}
