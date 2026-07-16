'use client';

import React from 'react';
import Header from '@/components/shared/Header/Header';
import ContentArea from '@/components/shared/ContentArea/ContentArea';
import Footer from '@/components/shared/Footer/Footer';

export default function RetroTypeHomePage() {
  return (
    <div className="retro-page-container">
      <Header />
      <ContentArea />
      <Footer />
    </div>
  );
}
