import React from 'react';
import './layout.css';

export const Layout: React.FC = ({ children }) => {
  return (
    <div id="wrapper">
      <div id="header">D3 demo</div>
      <div id="content">{children}</div>
      <div id="footer">Daniel Wilczewski</div>
    </div>
  );
};
