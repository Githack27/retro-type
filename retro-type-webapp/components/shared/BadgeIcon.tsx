import React from 'react';

interface BadgeIconProps {
  name: string;
  className?: string;
}

export default function BadgeIcon({ name, className = "badge-icon-svg" }: BadgeIconProps) {
  const cleanName = name.split(' (')[0].trim().toLowerCase();

  const imageBadges = ['novice', 'apprentice', 'writer', 'typist', 'scribe', 'author', 'maestro', 'legend'];
  if (imageBadges.includes(cleanName)) {
    return (
      <img 
        src={`/images/${cleanName}-badge.png`} 
        alt={name} 
        className="badge-image-el"
      />
    );
  }

  switch (cleanName) {
    // Speed badges
    case 'novice':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22V10M12 10a5 5 0 0 1 5-5M12 14a5 5 0 0 0-5-5" strokeLinecap="round" />
          <path d="M17 5c-1 0-3 1-5 5 2-4 4-5 5-5zM7 9c1 0 3 1 5 5-2-4-4-5-5-5z" fill="currentColor" />
        </svg>
      );
    case 'apprentice':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 3h12v4H6V3z" />
          <path d="M3 8h18v3H3V8z" />
          <path d="M4 11l2 8h12l2-8H4z" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="12" cy="14" r="1" fill="currentColor" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
          <circle cx="10" cy="17" r="1" fill="currentColor" />
          <circle cx="14" cy="17" r="1" fill="currentColor" />
        </svg>
      );
    case 'writer':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'typist':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" strokeWidth="2.5" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      );
    case 'scribe':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3l4 4-14 14H3v-4z" />
          <path d="M6 18H5v-1" />
          <rect x="2" y="16" width="6" height="5" rx="1" fill="currentColor" opacity="0.3" />
          <path d="M3 16v-2h4v2" />
        </svg>
      );
    case 'author':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="currentColor" fillOpacity="0.1" />
          <rect x="3" y="18" width="18" height="2" rx="0.5" />
        </svg>
      );
    case 'maestro':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 2l2.5 5.5L20 8.5l-4 4 1 5.5-5-3-5 3 1-5.5-4-4 5.5-1z" fill="currentColor" />
          <path d="M8 14l-2 8 6-3 6 3-2-8" />
        </svg>
      );
    case 'legend':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12,5 15,10 20,10 16,14 18,19 12,16 6,19 8,14 4,10 9,10" fill="currentColor" />
          <path d="M4 10a8 8 0 0 0 8 8 8 8 0 0 0 8-8" />
          <path d="M3 10a10 10 0 0 0 9 10 10 10 0 0 0 9-10" strokeDasharray="2,2" />
        </svg>
      );

    // Accuracy badges
    case 'laser precision':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M12 2v20M2 12h20" strokeWidth="2.5" />
        </svg>
      );
    case 'sniper':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M12 1v22M1 12h22" />
        </svg>
      );
    case 'steady fingers':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1s1-.4 1-1V3c0-.6-.4-1-1-1zm5 2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1V5c0-.6-.4-1-1-1zM7 5c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1V6c0-.6-.4-1-1-1zm15 6v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-7c0-.6-.4-1-1-1s-1 .4-1 1v7c0 3 2.5 5 5.5 5h10.5c3 0 5.5-2 5.5-5v-7c0-.6-.4-1-1-1z" />
        </svg>
      );

    // Volume badges
    case 'grandmaster':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4l3 3-3 3-3-3z" fill="currentColor" />
          <path d="M4 8l4 10h8l4-10" />
          <path d="M2 20h20v2H2z" fill="currentColor" />
        </svg>
      );
    case 'wordsmith':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 17.5L3 6V3h3l11.5 11.5z" />
          <path d="M13 19l4 4 4-4-4-4z" fill="currentColor" />
        </svg>
      );
    case 'keyboard enthusiast':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2.5" />
          <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" fillOpacity="0.1" />
          <path d="M6 20h12" />
        </svg>
      );

    default:
      // Fallback star
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
  }
}
