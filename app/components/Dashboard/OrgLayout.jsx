import React from 'react';
import LayoutAction from './LayoutAction';

const OrgLayout = ({ children }) => {
  return (
    <LayoutAction>
      <section className="flex-1 rounded-md">{children}</section>
    </LayoutAction>
  );
};

export default OrgLayout;
