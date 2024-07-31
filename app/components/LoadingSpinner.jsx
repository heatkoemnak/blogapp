import React from 'react';
import styles from '@/app/globals.css';
const LoadingSpinner = () => {
  return (
    // <div className="flex items-center justify-center">
    //   <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
    // </div>
    <div className="flex justify-center items-center h-full">
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default LoadingSpinner;
