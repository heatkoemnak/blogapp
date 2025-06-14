'use client';

import Hero from './components/Hero';
import LandingSearch from './components/LandingSearch';
import Navbar from './components/Navbar';
import LatestJob from './components/ui/jobs/LatestJob';

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingSearch />
      {/* <LatestJob /> */}
      <Hero />
    </>
  );
}
