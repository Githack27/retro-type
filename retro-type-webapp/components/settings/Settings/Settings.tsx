import React, { useState, useEffect } from 'react';
import { settingsService, SettingsState } from '@/services/settingsService';
import { playClickSound, playErrorSound } from '@/services/soundSynth';
import { applySettingsStyles } from '@/services/fontLoader';
import './Settings.css';

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState | null>(null);

  useEffect(() => {
    const unsub = settingsService.subscribe((s) => {
      setSettings(s);
      applySettingsStyles(s.fontFamily, s.localFont, s.fontSize);
    });
    return unsub;
  }, []);

  if (!settings) return null;

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    settingsService.updateSetting(key, value);
    if (key === 'playSoundOnClick') {
      playClickSound(value as string, settings.soundVolume, 'a');
    } else if (key === 'playSoundOnError') {
      playErrorSound(value as string, settings.soundVolume);
    } else if (key === 'soundVolume') {
      const sampleSound = settings.playSoundOnClick === 'off' ? 'click' : settings.playSoundOnClick;
      playClickSound(sampleSound, value as number, 'a');
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clickSounds = [
    'off', 'click', 'beep', 'pop', 'nk creams', 'typewriter',
    'osu', 'hitmarker', 'sine', 'sawtooth', 'square', 'triangle',
    'pentatonic', 'wholetone', 'fist fight', 'rubber keys', 'fart', 'akko lavenders',
    'cherrymx black abs', 'cherrymx black pbt', 'cherrymx blue abs', 'cherrymx blue pbt', 'cherrymx brown pbt', 'kalih box white',
    'razer green', 'tealios v2', 'trust gxt'
  ];

  const errorSounds = ['off', 'damage', 'triangle', 'square', 'missed punch'];

  const timeWarnings = ['off', '1 second', '3 seconds', '5 seconds', '10 seconds'] as const;

  const fontFamilies = [
    'Adwaita Mono', 'Atkinson Hyperlegible', 'Boon', 'Cascadia Mono', 'Comfortaa', 'Helvetica',
    'Coming Soon', 'CommitMono', 'Courier', 'Fira Code', 'Geist', 'Geist Mono',
    'Georgia', 'Hack', 'IBM Plex Mono', 'IBM Plex Sans', 'Inconsolata', 'Inter Tight',
    'Iosevka', 'Itim', 'JetBrains Mono', 'Kanit', 'Lalezar', 'Lato',
    'Lexend Deca', 'Mononoki', 'Montserrat', 'Noto Naskh Arabic', 'Noto Sans Lao', 'Nunito',
    'Open Dyslexic', 'Overpass Mono', 'Oxygen', 'Parkinsans', 'Proto', 'Roboto',
    'Roboto Mono', 'Sarabun', 'Source Code Pro', 'Space Grotesk', 'Special Elite', 'Titillium Web', 'Ubuntu',
    'Ubuntu Mono', 'custom'
  ];

  return (
    <div className="settings-full-width" id="settings-screen">
      <div className="settings-container">
        <h2 className="settings-header-main">Settings</h2>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="setting-title">difficulty</span>
            </div>
            <p className="setting-desc">
              Normal is the classic typing test experience. Expert fails the test if you submit (press space) an incorrect word. Master fails if you press a single incorrect key (meaning you have to achieve 100% accuracy).
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-options-row">
              {(['normal', 'expert', 'master'] as const).map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.difficulty === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('difficulty', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span className="setting-title">quick restart</span>
            </div>
            <p className="setting-desc">
              Press tab, esc or enter to quickly restart the test, or to quickly jump to the test page. These options disable tab navigation on most parts of the website. Using the "esc" option will move opening the commandline to the tab key.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-options-row">
              {(['off', 'esc', 'tab', 'enter'] as const).map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.quickRestart === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('quickRestart', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 1l4 4-4 4" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <path d="M7 23l-4-4 4-4" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <span className="setting-title">repeat quotes</span>
            </div>
            <p className="setting-desc">
              This setting changes the restarting behavior when typing in quote mode. Changing it to 'typing' will repeat the quote if you restart while typing.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-options-row">
              {(['off', 'typing'] as const).map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.repeatQuotes === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('repeatQuotes', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
              <span className="setting-title">blind mode</span>
              <svg viewBox="0 0 24 24" className="setting-title-icon" style={{ width: '14px', height: '14px', marginLeft: '-4px' }} fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <p className="setting-desc">
              No errors or incorrect words are highlighted. Helps you to focus on raw speed. If enabled, quick end is recommended.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-options-row">
              {(['off', 'on'] as const).map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.blindMode === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('blindMode', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              <span className="setting-title">always show words history</span>
            </div>
            <p className="setting-desc">
              This option will automatically show the words history at the end of the test. Can cause slight lag with a lot of words.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-options-row">
              {(['off', 'on'] as const).map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.alwaysShowWordsHistory === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('alwaysShowWordsHistory', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="13" y2="17" />
              </svg>
              <span className="setting-title">single list command line</span>
            </div>
            <p className="setting-desc">
              When enabled, it will show the command line with all commands in a single list instead of submenu arrangements. Selecting 'manual' will expose all commands only after typing &gt;.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-options-row">
              {(['manual', 'on'] as const).map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.singleListCommandLine === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('singleListCommandLine', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="setting-title">min speed</span>
            </div>
            <p className="setting-desc">
              Automatically fails a test if your speed falls below a threshold.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-input-wrapper">
              <input
                type="number"
                className="setting-number-input"
                value={settings.minSpeedCustom}
                onChange={(e) => updateSetting('minSpeedCustom', Math.max(0, parseInt(e.target.value) || 0))}
                disabled={settings.minSpeed === 'off'}
              />
              <div className="setting-options-row">
                {(['off', 'custom'] as const).map((opt) => (
                  <button
                    key={opt}
                    className={`setting-opt-btn ${settings.minSpeed === opt ? 'active' : ''}`}
                    onClick={() => updateSetting('minSpeed', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="setting-title">min accuracy</span>
            </div>
            <p className="setting-desc">
              Automatically fails a test if your accuracy falls below a threshold.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-input-wrapper">
              <input
                type="number"
                className="setting-number-input"
                value={settings.minAccuracyCustom}
                onChange={(e) => updateSetting('minAccuracyCustom', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                disabled={settings.minAccuracy === 'off'}
              />
              <div className="setting-options-row">
                {(['off', 'custom'] as const).map((opt) => (
                  <button
                    key={opt}
                    className={`setting-opt-btn ${settings.minAccuracy === opt ? 'active' : ''}`}
                    onClick={() => updateSetting('minAccuracy', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sound-section-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 10 9 14 5 14 19 10 15 6 15 6 9" />
            <path d="M17 5a9 9 0 0 1 0 14" />
            <path d="M20 9a5 5 0 0 1 0 6" />
          </svg>
          <span>sound</span>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span className="setting-title">sound volume</span>
            </div>
            <p className="setting-desc">
              Change the volume of the sound effects.
            </p>
          </div>
          <div className="settings-right">
            <div className="volume-slider-container">
              <span className="volume-val-display">{settings.soundVolume.toFixed(1)}</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                className="retro-range-slider"
                value={settings.soundVolume}
                onChange={(e) => updateSetting('soundVolume', parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="settings-row" style={{ display: 'block' }}>
          <div style={{ marginBottom: '15px' }}>
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span className="setting-title">play sound on click</span>
            </div>
            <p className="setting-desc">
              Plays a short sound when you press a key.
            </p>
          </div>
          <div>
            <div className="setting-options-grid">
              {clickSounds.map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.playSoundOnClick === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('playSoundOnClick', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
              <span className="setting-title">play sound on error</span>
              <svg viewBox="0 0 24 24" className="setting-title-icon" style={{ width: '14px', height: '14px', marginLeft: '-4px' }} fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <p className="setting-desc">
              Plays a short sound if you press an incorrect key or press space too early.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-options-row">
              {errorSounds.map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.playSoundOnError === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('playSoundOnError', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <svg viewBox="0 0 24 24" className="setting-title-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="setting-title">play time warning</span>
            </div>
            <p className="setting-desc">
              Play a short warning sound if you are close to the end of a timed test.
            </p>
          </div>
          <div className="settings-right">
            <div className="setting-options-row">
              {timeWarnings.map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.playTimeWarning === opt ? 'active' : ''}`}
                  onClick={() => updateSetting('playTimeWarning', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sound-section-header" style={{ marginTop: '40px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
          <span>typography</span>
        </div>

        <div className="settings-row">
          <div className="settings-left">
            <div className="setting-title-container">
              <span className="setting-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>A</span>
              <span className="setting-title">font size</span>
            </div>
            <p className="setting-desc">
              Change the font size of the test words.
            </p>
          </div>
          <div className="settings-right">
            <input
              type="number"
              step="0.1"
              min="0.5"
              max="5"
              className="setting-number-input"
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', Math.max(0.5, parseFloat(e.target.value) || 2))}
            />
          </div>
        </div>

        <div className="settings-row" style={{ display: 'block' }}>
          <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1.2 }}>
              <div className="setting-title-container">
                <span className="setting-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>A</span>
                <span className="setting-title">font family</span>
              </div>
              <p className="setting-desc">
                Change the font family used by the website. Using a local font will override your choice. Note: Local fonts are not sent to the server and will not persist across devices.
              </p>
            </div>
            <div className="settings-right" style={{ flex: 1.8 }}>
              <button
                className="setting-opt-btn"
                onClick={() => {
                  const font = prompt('Enter a local font name (e.g. Consolas, Segoe UI):');
                  if (font !== null) {
                    updateSetting('localFont', font);
                  }
                }}
              >
                use local font
              </button>
              {settings.localFont && (
                <div className="font-custom-input-row">
                  <span className="font-custom-input-label">current local font:</span>
                  <input
                    type="text"
                    className="setting-number-input"
                    value={settings.localFont}
                    onChange={(e) => updateSetting('localFont', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="setting-options-grid">
              {fontFamilies.map((opt) => (
                <button
                  key={opt}
                  className={`setting-opt-btn ${settings.fontFamily === opt ? 'active' : ''}`}
                  onClick={() => {
                    updateSetting('fontFamily', opt);
                    if (opt !== 'custom') {
                      updateSetting('localFont', '');
                    }
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="back-to-top-btn" onClick={handleScrollToTop} title="Back to top">
        <svg viewBox="0 0 24 24">
          <path d="M12 4l-8 8h6v8h4v-8h6z" />
        </svg>
      </button>
    </div>
  );
}
