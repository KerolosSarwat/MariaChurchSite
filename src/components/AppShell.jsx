'use client';

import React from 'react';
import Navbar from './Navbar';
import AppFooter from './AppFooter';

export default function AppShell({ children }) {
  return (
    <div className="church-page-root">
      <Navbar />
      <div className="page-main-wrapper">
        {children}
      </div>
      <AppFooter />
    </div>
  );
}
