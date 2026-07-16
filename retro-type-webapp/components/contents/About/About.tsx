import React from 'react';
import BadgeIcon from '@/components/shared/BadgeIcon/BadgeIcon';
import './About.css';

export default function About() {
  return (
    <div className="about-container" id="about-screen">
      
      <section className="about-hero-section">
        <div className="about-hero-left">
          <div className="typewriter-image-wrapper">
            <img 
              src="/images/retro-typewriter.png" 
              alt="Vintage Typewriter" 
              className="about-typewriter-img" 
            />
          </div>
        </div>
        <div className="about-hero-right">
          <div className="about-section-label">
            <span className="dot-decor">✦</span> ABOUT <span className="dot-decor">✦</span>
          </div>
          <h2 className="about-hero-title">What is RetroType?</h2>
          <p className="about-hero-description">
            RetroType is a distraction-free typing platform designed to help you type more, improve faster, and track your progress with clarity.
          </p>
          <p className="about-hero-subdescription">
            Inspired by the timeless charm of classic typewriters and built for modern typists.
          </p>
          
          <div className="about-features-row">
            <div className="about-feature-item">
              <div className="about-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="6" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="6" cy="8" r="1" fill="currentColor" />
                  <circle cx="10" cy="8" r="1" fill="currentColor" />
                  <circle cx="14" cy="8" r="1" fill="currentColor" />
                  <circle cx="18" cy="8" r="1" fill="currentColor" />
                  <circle cx="8" cy="12" r="1" fill="currentColor" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                  <circle cx="16" cy="12" r="1" fill="currentColor" />
                </svg>
              </div>
              <span className="about-feature-title">Simple &amp; Focused</span>
            </div>
            <div className="about-feature-item">
              <div className="about-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
                  <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2" />
                  <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="about-feature-title">Accurate Tracking</span>
            </div>
            <div className="about-feature-item">
              <div className="about-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 18v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M13 18v-9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v9" fill="none" stroke="currentColor" strokeWidth="2" />
                  <polyline points="2 20 22 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M12 4l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 7H8v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="about-feature-title">Progress That Matters</span>
            </div>
            <div className="about-feature-item">
              <div className="about-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 3l1.5 3.5L17 7l-3 3 1 4.5-4-2.5-4 2.5 1-4.5-3-3 3.5-.5z" fill="currentColor" />
                  <path d="M8 13.5l-2 8 6-3 6 3-2-8" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="about-feature-title">Levels That Motivate</span>
            </div>
          </div>
        </div>
      </section>

      
      <section className="about-section about-how-it-works">
        <div className="about-section-label">
          <span className="dot-decor">✦</span> HOW IT WORKS <span className="dot-decor">✦</span>
        </div>
        <div className="about-how-grid">
          <div className="about-how-item">
            <div className="about-how-num">1</div>
            <div className="about-how-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" strokeWidth="2" />
                <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="17" x2="16" y2="17" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="about-how-title">Choose a Test</h4>
            <p className="about-how-desc">Pick a test mode that suits you - Time, Words, Quote, or Custom.</p>
          </div>

          <div className="about-how-item">
            <div className="about-how-num">2</div>
            <div className="about-how-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="20" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M4 15l2 4h12l2-4" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" />
                <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="about-how-title">Start Typing</h4>
            <p className="about-how-desc">Type the given text as accurately and quickly as you can.</p>
          </div>

          <div className="about-how-item">
            <div className="about-how-num">3</div>
            <div className="about-how-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12a9 9 0 0 1 15-6.7M21 12a9 9 0 0 1-9 9" fill="none" stroke="currentColor" strokeWidth="2" />
                <polyline points="12 7 12 12 16 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="12" x2="17" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h4 className="about-how-title">Get Instant Results</h4>
            <p className="about-how-desc">See your WPM, accuracy, errors, and more - instantly.</p>
          </div>

          <div className="about-how-item">
            <div className="about-how-num">4</div>
            <div className="about-how-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10M12 20V4M6 20v-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 8h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h4 className="about-how-title">Improve &amp; Level Up</h4>
            <p className="about-how-desc">Practice regularly, improve your skills, and climb the ranks.</p>
          </div>
        </div>
      </section>

      
      <section className="about-section about-metrics-explained">
        <div className="about-section-label">
          <span className="dot-decor">✦</span> METRICS EXPLAINED <span className="dot-decor">✦</span>
        </div>
        <div className="about-metrics-grid">
          
          <div className="about-metric-card">
            <div className="about-metric-left">
              <div className="about-metric-icon-circle">WPM</div>
            </div>
            <div className="about-metric-right">
              <h4 className="about-metric-title">WPM (Words Per Minute)</h4>
              <p className="about-metric-desc">Shows how many words you type correctly in one minute.</p>
            </div>
          </div>
          
          <div className="about-metric-card">
            <div className="about-metric-left">
              <div className="about-metric-icon-circle accent">RAW</div>
            </div>
            <div className="about-metric-right">
              <h4 className="about-metric-title">Raw WPM</h4>
              <p className="about-metric-desc">Your total typing speed including errors. Shows your true keystroke speed.</p>
            </div>
          </div>
          
          <div className="about-metric-card">
            <div className="about-metric-left">
              <div className="about-metric-icon-circle">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
                  <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2" />
                  <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="about-metric-right">
              <h4 className="about-metric-title">Accuracy (Acc)</h4>
              <p className="about-metric-desc">The percentage of correct characters you type. Accuracy is everything!</p>
            </div>
          </div>
          
          <div className="about-metric-card">
            <div className="about-metric-left">
              <div className="about-metric-icon-circle">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="6" width="20" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="2" />
                  <line x1="11" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="2" />
                  <line x1="16" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
            </div>
            <div className="about-metric-right">
              <h4 className="about-metric-title">Strokes</h4>
              <p className="about-metric-desc">Total number of keystrokes you make, including spaces, backspaces, and corrections.</p>
            </div>
          </div>
          
          <div className="about-metric-card">
            <div className="about-metric-left">
              <div className="about-metric-icon-circle accent">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="about-metric-right">
              <h4 className="about-metric-title">Errors</h4>
              <p className="about-metric-desc">The number of mistakes made while typing. Fewer errors, higher the score.</p>
            </div>
          </div>
          
          <div className="about-metric-card">
            <div className="about-metric-left">
              <div className="about-metric-icon-circle">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <polyline points="12 6 12 12 16 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="about-metric-right">
              <h4 className="about-metric-title">Time</h4>
              <p className="about-metric-desc">Total time taken to complete the test. Speed with consistency wins!</p>
            </div>
          </div>
        </div>
        <div className="about-quote-footer">★ Focus on accuracy. Speed will follow. ★</div>
      </section>

      
      <section className="about-section about-levels-ranks">
        <div className="about-section-label">
          <span className="dot-decor">✦</span> LEVELS &amp; RANKS <span className="dot-decor">✦</span>
        </div>
        <p className="about-levels-subtitle">
          The faster you type, the higher you rise. Here are the ranks you can achieve!
        </p>
        <div className="about-ranks-row">
          
          <div className="about-rank-card">
            <div className="badge-card badge-bronze">
              <BadgeIcon name="Novice" />
            </div>
            <h5 className="about-rank-name">Novice</h5>
            <span className="about-rank-wpm">0 - 20 WPM</span>
            <p className="about-rank-desc">Every expert was once a beginner.</p>
          </div>
          
          <div className="about-rank-card">
            <div className="badge-card badge-silver">
              <BadgeIcon name="Apprentice" />
            </div>
            <h5 className="about-rank-name">Apprentice</h5>
            <span className="about-rank-wpm">20 - 40 WPM</span>
            <p className="about-rank-desc">You're building speed and consistency.</p>
          </div>
          
          <div className="about-rank-card">
            <div className="badge-card badge-silver">
              <BadgeIcon name="Writer" />
            </div>
            <h5 className="about-rank-name">Writer</h5>
            <span className="about-rank-wpm">40 - 60 WPM</span>
            <p className="about-rank-desc">You're on the right track.</p>
          </div>
          
          <div className="about-rank-card">
            <div className="badge-card badge-silver">
              <BadgeIcon name="Typist" />
            </div>
            <h5 className="about-rank-name">Typist</h5>
            <span className="about-rank-wpm">60 - 80 WPM</span>
            <p className="about-rank-desc">Words flow faster now. Keep going!</p>
          </div>
          
          <div className="about-rank-card">
            <div className="badge-card badge-platinum">
              <BadgeIcon name="Scribe" />
            </div>
            <h5 className="about-rank-name">Scribe</h5>
            <span className="about-rank-wpm">80 - 100 WPM</span>
            <p className="about-rank-desc">You have great speed and control.</p>
          </div>
          
          <div className="about-rank-card">
            <div className="badge-card badge-platinum">
              <BadgeIcon name="Author" />
            </div>
            <h5 className="about-rank-name">Author</h5>
            <span className="about-rank-wpm">100 - 120 WPM</span>
            <p className="about-rank-desc">You type with power and precision.</p>
          </div>
          
          <div className="about-rank-card">
            <div className="badge-card badge-platinum">
              <BadgeIcon name="Maestro" />
            </div>
            <h5 className="about-rank-name">Maestro</h5>
            <span className="about-rank-wpm">120 - 150 WPM</span>
            <p className="about-rank-desc">Exceptional speed. Exceptional you.</p>
          </div>
          
          <div className="about-rank-card">
            <div className="badge-card badge-gold">
              <BadgeIcon name="Legend" />
            </div>
            <h5 className="about-rank-name">Legend</h5>
            <span className="about-rank-wpm">150+ WPM</span>
            <p className="about-rank-desc">You don't just type. You inspire.</p>
          </div>
        </div>
        <div className="about-quote-footer">
          ★ Ranks are based on your best performance in 1-minute test. Keep practicing to reach the top! ★
        </div>
      </section>

      
      <section className="about-section about-contact-section">
        <div className="about-section-label">
          <span className="dot-decor">✦</span> CONTACT US <span className="dot-decor">✦</span>
        </div>
        <p className="about-levels-subtitle" style={{ marginBottom: '40px' }}>
          We'd love to hear from you!
        </p>
        <div className="about-contact-grid">
          <div className="about-contact-info">
            <div className="about-contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <a href="mailto:hello@retrotype.com" className="contact-link">hello@retrotype.com</a>
              </div>
            </div>

            <div className="about-contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-label">Website</span>
                <a href="https://www.retrotype.com" target="_blank" rel="noreferrer" className="contact-link">www.retrotype.com</a>
              </div>
            </div>

            <div className="about-contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-label">Feedback / Support</span>
                <a href="mailto:support@retrotype.com" className="contact-link">support@retrotype.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
