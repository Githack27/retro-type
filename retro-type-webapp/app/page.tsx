'use client';

import React, { useEffect } from 'react';
import Header from '@/components/shared/Header';
import ContentArea from '@/components/shared/ContentArea';
import Footer from '@/components/shared/Footer';
import { settingsService } from '@/services/settingsService';
import { applySettingsStyles } from '@/services/fontLoader';

export default function RetroTypeHomePage() {
  useEffect(() => {
    const unsub = settingsService.subscribe((s) => {
      applySettingsStyles(s.fontFamily, s.localFont, s.fontSize);
    });
    return unsub;
  }, []);

  return (
    <div className="retro-page-container">
      <Header />
      <ContentArea />
      <Footer />
    </div>
  );
}
