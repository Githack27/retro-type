import React, { useEffect } from 'react';
import { navigationService } from '@/services/navigation';
import './Home.css';

export default function Home() {
  useEffect(() => {
    const handleEnterKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        navigationService.navigate('playground');
      }
    };

    window.addEventListener('keydown', handleEnterKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="welcome-divider-container">
        <div className="divider-line" />
        <span className="welcome-text">WELCOME TO</span>
        <div className="divider-line" />
      </div>

      <h1 className="center-logo-title" id="page-hero-title">
        <span className="retro-part">Retro</span>
        <span className="type-part">Type</span>
      </h1>

      <div className="separator-icon-container">
        <div className="icon-line icon-line-left" />
        <svg className="separator-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2h12v6H6V2z" />
          <path d="M8 4h8v1.2H8V4zm0 2h5v1.2H8V6z" fill="#0f0f0e" />
          <path d="M2 9h20v2.5H2V9z" />
          <circle cx="1" cy="10.25" r="1.5" />
          <circle cx="23" cy="10.25" r="1.5" />
          <path d="M3.5 12.5h17l1.5 8.5H2L3.5 12.5z" />
          <rect x="5.5" y="14.5" width="13" height="4.5" rx="0.5" fill="#0f0f0e" />
          <circle cx="7.5" cy="15.8" r="1.1" fill="currentColor" />
          <circle cx="10.5" cy="15.8" r="1.1" fill="currentColor" />
          <circle cx="13.5" cy="15.8" r="1.1" fill="currentColor" />
          <circle cx="16.5" cy="15.8" r="1.1" fill="currentColor" />
          <circle cx="9" cy="17.4" r="1.1" fill="currentColor" />
          <circle cx="12" cy="17.4" r="1.1" fill="currentColor" />
          <circle cx="15" cy="17.4" r="1.1" fill="currentColor" />
        </svg>
        <div className="icon-line icon-line-right" />
      </div>

      <p className="description-text" id="hero-description">
        Classic typing experience.<br />
        Modern performance.
      </p>

      <button 
        className="green-metal-btn" 
        id="start-typing-btn"
        onClick={() => navigationService.navigate('playground')}
      >
        <div className="btn-rivet rivet-tl" />
        <div className="btn-rivet rivet-tr" />
        <div className="btn-rivet rivet-bl" />
        <div className="btn-rivet rivet-br" />
        
        <span className="btn-text-content">START TYPING</span>
        
        <svg className="btn-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      <div className="press-key-prompt" id="press-any-key-instruction">
        Press Enter to begin
      </div>
    </div>
  );
}
