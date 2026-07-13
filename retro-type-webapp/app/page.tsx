'use client';

import Header from '@/components/shared/Header';
import ContentArea from '@/components/shared/ContentArea';
import Footer from '@/components/shared/Footer';

export default function RetroTypeHomePage() {
  return (
    <div className="retro-page-container">
      {/* Top Header Section */}
      <Header />
      
      {/* Main Content Body Section */}
      <ContentArea />
      
      {/* Bottom Footer Section */}
      <Footer />
    </div>
  );
}
