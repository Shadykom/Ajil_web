'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BranchLocator } from '@/components/branch-locator/BranchLocator';

export default function BranchesPage() {
  return (
    <>
      <Header />
      <main className="pt-4">
        <BranchLocator />
      </main>
      <Footer />
    </>
  );
}
