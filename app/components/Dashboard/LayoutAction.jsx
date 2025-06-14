import React from 'react';
import Layout from './Layout';
import Link from 'next/link';

const LayoutAction = ({ children }) => {
  return (
    <Layout>
      <section className="">{children}</section>
    </Layout>
  );
};

export default LayoutAction;
