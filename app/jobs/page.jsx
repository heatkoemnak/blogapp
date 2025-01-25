'use client';

import LandingSearch from '../components/LandingSearch';
import MainSection from '../components/MainSection';
import LatestJob from '../components/ui/jobs/LatestJob';

const Jobs = () => {
  return (
    <>
      <LandingSearch />
      <LatestJob />
      <MainSection />
    </>
  );
};

export default Jobs;
