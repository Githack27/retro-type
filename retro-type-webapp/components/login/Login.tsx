'use client';

import React, { useState } from 'react';
import { navigationService } from '@/services/navigation';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await navigationService.apiLogin(email, password);
      navigationService.navigate('home');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }
    try {
      await navigationService.apiSignup(username, email, password);
      navigationService.navigate('home');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed');
    }
  };

  const handleClose = () => {
    navigationService.navigate('home');
  };

  return (
    <div className="login-backdrop-dim">
      {/* Retro Index Card / Metal container with left-right row order */}
      <div className="login-card">
        {/* Close Button to exit login view */}
        <button 
          className="login-close-btn" 
          onClick={handleClose}
          title="Return to Home"
        >
          &times;
        </button>

        {/* Left Side: Banner image from public folder */}
        <div className="login-banner-side">
          <div className="login-banner-overlay-tint" />
          <img 
            src="/images/retro-type-login-banner.png" 
            alt="Retro Type Login Banner" 
            className="login-banner-image-row"
          />
        </div>

        {/* Right Side: Form container with custom transition */}
        <div className="login-form-side">
          {isLogin ? (
            /* LOGIN FORM */
            <form key="login-form" className="retro-form fade-in" onSubmit={handleLoginSubmit}>
              <h2 className="form-title">CARRIAGE LOG IN</h2>
              <div className="typewriter-line" style={{ marginBottom: '20px' }} />
              {errorMsg && (
                <div className="error-message" style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '11px', marginBottom: '15px', textTransform: 'uppercase', textAlign: 'center' }}>
                  ⚠ ERROR: {errorMsg}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">EMAIL ADDRESS / USERNAME</label>
                <input 
                  type="text" 
                  className="retro-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your callsign..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">PASSWORD</label>
                <input 
                  type="password" 
                  className="retro-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secret key..."
                  required
                />
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="form-options-row">
                <label className="remember-me-label">
                  <input 
                    type="checkbox" 
                    className="retro-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>REMEMBER ME</span>
                </label>
                <a 
                  href="#forgot" 
                  className="forgot-pass-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Instructions to recover secret key sent!");
                  }}
                >
                  FORGOT PASSWORD?
                </a>
              </div>

              <button type="submit" className="green-metal-btn login-btn">
                <div className="btn-rivet rivet-tl" />
                <div className="btn-rivet rivet-tr" />
                <div className="btn-rivet rivet-bl" />
                <div className="btn-rivet rivet-br" />
                <span className="btn-text-content">ENGAGE SESSION</span>
              </button>

              <div className="form-switch-prompt">
                <span>NEW OPERATOR?</span>{' '}
                <button 
                  type="button" 
                  className="switch-form-btn" 
                  onClick={() => setIsLogin(false)}
                >
                  REGISTER AN ACCOUNT
                </button>
              </div>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form key="signup-form" className="retro-form fade-in" onSubmit={handleSignupSubmit}>
              <h2 className="form-title">REGISTER OPERATOR</h2>
              <div className="typewriter-line" style={{ marginBottom: '20px' }} />
              {errorMsg && (
                <div className="error-message" style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '11px', marginBottom: '15px', textTransform: 'uppercase', textAlign: 'center' }}>
                  ⚠ ERROR: {errorMsg}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">OPERATOR USERNAME</label>
                <input 
                  type="text" 
                  className="retro-input" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose unique callsign..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  className="retro-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter contact path..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">CREATE PASSWORD</label>
                <input 
                  type="password" 
                  className="retro-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Assign secret key..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">CONFIRM PASSWORD</label>
                <input 
                  type="password" 
                  className="retro-input" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Verify secret key..."
                  required
                />
              </div>

              <button type="submit" className="green-metal-btn login-btn">
                <div className="btn-rivet rivet-tl" />
                <div className="btn-rivet rivet-tr" />
                <div className="btn-rivet rivet-bl" />
                <div className="btn-rivet rivet-br" />
                <span className="btn-text-content">INITIALIZE CALLSIGN</span>
              </button>

              <div className="form-switch-prompt">
                <span>ALREADY REGISTERED?</span>{' '}
                <button 
                  type="button" 
                  className="switch-form-btn" 
                  onClick={() => setIsLogin(true)}
                >
                  RETURN TO LOGIN
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
