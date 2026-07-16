import React from 'react';
import { navigationService } from '@/services/navigation';
import { useAuth } from '@/hooks/useNavigation';
import './Header.css';

export default function Header() {
  const { isLoggedIn, userName } = useAuth();
  return (
    <header className="retro-header">
      
      <a 
        href="/" 
        className="brand-container" 
        id="header-logo-link"
        onClick={(e) => {
          e.preventDefault();
          navigationService.navigate('home');
        }}
      >
        
        <svg className="brand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          
          <path d="M6 2h12v6H6V2z" />
          
          <path d="M8 4h8v1.2H8V4zm0 2h5v1.2H8V6z" fill="#0f0f0e" />
          
          <path d="M2 9h20v2.5H2V9z" />
          
          <circle cx="1" cy="10.25" r="1.5" />
          <circle cx="23" cy="10.25" r="1.5" />
          
          <path d="M3.5 12.5h17l1.5 8.5H2L3.5 12.5z" />
          
          <rect x="5.5" y="14.5" width="13" height="4.5" rx="0.5" fill="#0f0f0e" />
          
          <circle cx="7.5" cy="15.8" r="1.1" fill="#ffffff" />
          <circle cx="10.5" cy="15.8" r="1.1" fill="#ffffff" />
          <circle cx="13.5" cy="15.8" r="1.1" fill="#ffffff" />
          <circle cx="16.5" cy="15.8" r="1.1" fill="#ffffff" />
          <circle cx="9" cy="17.4" r="1.1" fill="#ffffff" />
          <circle cx="12" cy="17.4" r="1.1" fill="#ffffff" />
          <circle cx="15" cy="17.4" r="1.1" fill="#ffffff" />
        </svg>
        <span className="brand-text">
          <span className="retro-part">Retro</span>
          <span className="type-part">Type</span>
        </span>
      </a>

      
      <nav className="nav-container" id="header-nav">
        
        <a 
          href="#practice" 
          className="nav-item" 
          id="nav-practice"
          onClick={(e) => {
            e.preventDefault();
            navigationService.navigate('playground');
          }}
        >
          <div className="nav-icon-circle">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2.8" />
              
              <line x1="7" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
              
              <circle cx="6" cy="8" r="1.2" />
              <circle cx="10" cy="8" r="1.2" />
              <circle cx="14" cy="8" r="1.2" />
              <circle cx="18" cy="8" r="1.2" />
              <circle cx="6" cy="12" r="1.2" />
              <circle cx="10" cy="12" r="1.2" />
              <circle cx="14" cy="12" r="1.2" />
              <circle cx="18" cy="12" r="1.2" />
            </svg>
          </div>
          <span className="nav-text">Practice</span>
        </a>

        
        {isLoggedIn && (
          <a 
            href="#dashboard" 
            className="nav-item" 
            id="nav-dashboard"
            onClick={(e) => {
              e.preventDefault();
              navigationService.navigate('dashboard');
            }}
          >
            <div className="nav-icon-circle">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2.8" />
                <line x1="9" y1="17" x2="9" y2="10" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="15" y1="17" x2="15" y2="7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="nav-text">Dashboard</span>
          </a>
        )}

        
        <a 
          href="#rankings" 
          className="nav-item" 
          id="nav-rankings"
          onClick={(e) => {
            e.preventDefault();
            navigationService.navigate('rankings');
          }}
        >
          <div className="nav-icon-circle">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 19 L22 19 L20 7 L16 12 L12 5 L8 12 L4 7 Z" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
              <line x1="2" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="2.8" />
            </svg>
          </div>
          <span className="nav-text">Rankings</span>
        </a>

        
        <a 
          href="#settings" 
          className="nav-item" 
          id="nav-settings"
          onClick={(e) => {
            e.preventDefault();
            navigationService.navigate('settings');
          }}
        >
          <div className="nav-icon-circle">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2.8" />
              <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.7l.3.3c.6.6.6 1.5 0 2.1l-.9.9c-.6.6-1.5.6-2.1 0l-.3-.3a1.6 1.6 0 0 0-1.7-.3 1.6 1.6 0 0 0-1 1.5v.5c0 .8-.6 1.5-1.4 1.5h-1.3c-.8 0-1.4-.7-1.4-1.5v-.5a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.7.3l-.3.3c-.6.6-1.5.6-2.1 0l-.9-.9c-.6-.6-.6-1.5 0-2.1l.3-.3a1.6 1.6 0 0 0 .3-1.7 1.6 1.6 0 0 0-1.5-1h-.5C2.7 12.5 2 11.9 2 11.1V9.8C2 9 2.7 8.3 3.5 8.3h.5a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.7l-.3-.3c-.6-.6-.6-1.5 0-2.1l.9-.9c.6-.6 1.5-.6 2.1 0l.3.3a1.6 1.6 0 0 0 1.7.3 1.6 1.6 0 0 0 1-1.5v-.5C10.5 1.7 11.1 1 11.9 1h1.3c.8 0 1.4.7 1.4 1.5v.5a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.7-.3l.3-.3c.6-.6 1.5-.6 2.1 0l.9.9c.6.6.6 1.5 0 2.1l-.3.3a1.6 1.6 0 0 0-.3 1.7 1.6 1.6 0 0 0 1.5 1h.5c.8 0 1.5.6 1.5 1.4v1.3c0 .8-.7 1.4-1.5 1.4h-.5a1.6 1.6 0 0 0-1.5 1z" fill="none" stroke="currentColor" strokeWidth="2.8" />
            </svg>
          </div>
          <span className="nav-text">Settings</span>
        </a>

        
        <a 
          href="#about" 
          className="nav-item" 
          id="nav-about"
          onClick={(e) => {
            e.preventDefault();
            navigationService.navigate('about');
          }}
        >
          <div className="nav-icon-circle">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.8" />
              
              <line x1="12" y1="11" x2="12" y2="17" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
              
              <circle cx="12" cy="7.5" r="1.6" fill="currentColor" />
            </svg>
          </div>
          <span className="nav-text">About</span>
        </a>

        
        {isLoggedIn && (
          <div className="user-profile-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'default' }}>
            <div className="nav-icon-circle user-badge-icon" style={{ backgroundColor: 'rgba(197, 155, 39, 0.12)', color: 'var(--color-gold)' }}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2.8" />
              </svg>
            </div>
            <span className="nav-text" style={{ color: 'var(--color-gold)', fontWeight: 'bold', textShadow: '0 1.5px 3px rgba(0, 0, 0, 0.8)' }}>{userName}</span>
          </div>
        )}

        
        {!isLoggedIn ? (
          <a 
            href="#login" 
            className="nav-item" 
            id="nav-login"
            onClick={(e) => {
              e.preventDefault();
              navigationService.navigate('login');
            }}
          >
            <div className="nav-icon-circle">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                <polyline points="10 17 15 12 10 7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="nav-text">Login</span>
          </a>
        ) : (
          <a 
            href="#logout" 
            className="nav-item" 
            id="nav-logout"
            onClick={async (e) => {
              e.preventDefault();
              await navigationService.apiLogout();
              navigationService.navigate('home');
            }}
          >
            <div className="nav-icon-circle" style={{ color: '#ef4444' }}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                <polyline points="16 17 21 12 16 7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="nav-text">Logout</span>
          </a>
        )}
      </nav>
    </header>
  );
}
