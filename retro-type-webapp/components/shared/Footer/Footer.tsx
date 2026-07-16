import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="retro-footer">
      
      <div className="follow-divider-container">
        <div className="icon-line icon-line-left" />
        <span className="follow-text">FOLLOW RETROTYPE</span>
        <div className="icon-line icon-line-right" />
      </div>

      
      <div className="socials-row" id="footer-socials">
        
        <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="social-btn" id="social-discord" title="Discord">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.3 4.9a16.6 16.6 0 0 0-4.1-1.3l-.2.4a15.3 15.3 0 0 0-3.3 0l-.2-.4a16.6 16.6 0 0 0-4.1 1.3A17.9 17.9 0 0 0 3.2 16.9a17.2 17.2 0 0 0 5.1 2.6l1-1.4A11.4 11.4 0 0 1 6.8 17l1-.7a12.2 12.2 0 0 0 8.4 0l1 .7a11.4 11.4 0 0 1-2.5 1.1l1 1.4a17.2 17.2 0 0 0 5.1-2.6 17.9 17.9 0 0 0-4.3-12zm-9.8 10a1.8 1.8 0 1 1 1.8-1.8 1.8 1.8 0 0 1-1.8 1.8zm5 0a1.8 1.8 0 1 1 1.8-1.8 1.8 1.8 0 0 1-1.8 1.8z" />
          </svg>
        </a>

        
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" id="social-twitter" title="Twitter / X">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.2 2H21.5L14.3 10.3L22.8 22H16.2L11 15.2L5.1 22H1.8L9.5 13.2L1.3 2H8.1L12.8 8.2L18.2 2ZM17.1 20H18.9L7.1 4H5.1L17.1 20Z" />
          </svg>
        </a>

        
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn" id="social-github" title="GitHub">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1a3.4 3.4 0 0 1 1-2.1c-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.4 4.4 0 0 1 .1-3.2s1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.4 4.4 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.6-2.8 5.6-5.5 5.9a3 3 0 0 1 .8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
          </svg>
        </a>

        
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" id="social-instagram" title="Instagram">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.2c3.2 0 3.6 0 4.9.1a6.7 6.7 0 0 1 2.2.4 4 4 0 0 1 2.3 2.3c.3.7.4 1.4.4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9a6.7 6.7 0 0 1-.4 2.2 4 4 0 0 1-2.3 2.3c-.7.3-1.4.4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1a6.7 6.7 0 0 1-2.2-.4 4 4 0 0 1-2.3-2.3c-.3-.7-.4-1.4-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9a6.7 6.7 0 0 1 .4-2.2 4 4 0 0 1 2.3-2.3c.7-.3 1.4-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0-1.8C8.7.4 8.3.4 7 .5a8.5 8.5 0 0 0-2.8.5 5.8 5.8 0 0 0-3.3 3.3A8.5 8.5 0 0 0 .4 7c-.1 1.3-.1 1.7-.1 5s0 3.7.1 5a8.5 8.5 0 0 0 .5 2.8 5.8 5.8 0 0 0 3.3 3.3 8.5 8.5 0 0 0 2.8.5c1.3.1 1.7.1 5 .1s3.7 0 5-.1a8.5 8.5 0 0 0 2.8-.5 5.8 5.8 0 0 0 3.3-3.3 8.5 8.5 0 0 0 .5-2.8c.1-1.3.1-1.7.1-5s0-3.7-.1-5a8.5 8.5 0 0 0-.5-2.8 5.8 5.8 0 0 0-3.3-3.3A8.5 8.5 0 0 0 17 .5C15.7.4 15.3.4 12 .4zM12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10.2A4.2 4.2 0 1 1 16.2 12 4.2 4.2 0 0 1 12 16.2zm6.4-11a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z" />
          </svg>
        </a>

        
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" id="social-youtube" title="YouTube">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 16 24 12 24 12s0-4-.5-5.8zM9.5 15.5V8.5l6.5 3.5z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
