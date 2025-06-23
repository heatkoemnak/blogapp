'use client';
import React, { useState } from 'react';
import PDFUploader from '../components/PDF/PDFUploader';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Jobs = () => {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <>
      <Navbar />
      {
        !isSearch && (
          <PDFUploader />
        )
      }
      <MainSection setIsSearch={setIsSearch}/>
      <Footer/>
    </>
  );
};

export default Jobs;
