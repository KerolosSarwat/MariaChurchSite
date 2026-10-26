'use client';

import React from 'react';
import HomeHeroServices from '../components/HomeHeroServices';

export default function HomePage() {
  return (
    <main className="portal-main-container" id="home">
      {/* Home: the home page which displays general info about the Mariam Church and services provided by site */}
      <HomeHeroServices />
    </main>
  );
}
