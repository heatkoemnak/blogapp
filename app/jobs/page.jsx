'use client';

import PDFUploader from '../components/PDF/PDFUploader';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Jobs = () => {
  return (
    <>
      <Navbar />
      <PDFUploader />
      <MainSection />
      <Footer/>
    </>
  );
};

export default Jobs;
