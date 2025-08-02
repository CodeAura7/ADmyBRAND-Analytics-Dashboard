"use client"; // Enables client-side hooks used by Dashboard or children

import React from 'react';
import Dashboard from '../src/components/Dashboard'; // ✅ Adjust path if needed

const HomePage = () => {
  return (
    <main>
      <Dashboard />
    </main>
  );
};

export default HomePage; // ✅ Required default export for Next.js
