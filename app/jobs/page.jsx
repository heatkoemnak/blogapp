'use client';

import Footer from '../components/Footer';
import MainSection from '../components/MainSection';
import Navbar from '../components/Navbar';
import PDFUploader from '../components/PDF/PDFUploader';

const Jobs = () => {
  return (
    <>
      <Navbar />
      {/* <Search /> */}
      <PDFUploader />
      <MainSection />
      <Footer/>
    </>
  );
};

export default Jobs;
