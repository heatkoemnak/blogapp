'use client';

import Hero from './components/Hero';
import LandingSearch from './components/LandingSearch';
import LatestJob from './components/ui/jobs/LatestJob';

export default function Home() {
  return (
    <>
      <LandingSearch />
      <LatestJob />
      <Hero />
    </>
  );
}
