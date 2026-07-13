'use client';

import React from 'react';
import { TypingMetrics } from './Typer';

interface MetricsProps {
  metrics: TypingMetrics;
  attemptNumber?: number;
  prevWpm?: number;
  prevAccuracy?: number;
  newWpm?: number;
  newAccuracy?: number;
  onRestart: () => void;
}

export default function Metrics({ 
  metrics, 
  attemptNumber, 
  prevWpm = 0, 
  prevAccuracy = 0, 
  newWpm = 0, 
  newAccuracy = 0, 
  onRestart 
}: MetricsProps) {
  // Determine skill classification based on average WPM and Accuracy
  const targetWpm = newWpm > 0 ? newWpm : metrics.wpm;
  const targetAcc = newAccuracy > 0 ? newAccuracy : metrics.accuracy;

  let wpmTier = 'NOVICE';
  if (targetWpm >= 150 && targetAcc >= 98) {
    wpmTier = 'LEGEND';
  } else if (targetWpm >= 120 && targetAcc >= 95) {
    wpmTier = 'MAESTRO';
  } else if (targetWpm >= 100 && targetAcc >= 95) {
    wpmTier = 'AUTHOR';
  } else if (targetWpm >= 80 && targetAcc >= 90) {
    wpmTier = 'SCRIBE';
  } else if (targetWpm >= 60 && targetAcc >= 90) {
    wpmTier = 'TYPIST';
  } else if (targetWpm >= 40 && targetAcc >= 90) {
    wpmTier = 'WRITER';
  } else if (targetWpm >= 20 && targetAcc >= 85) {
    wpmTier = 'APPRENTICE';
  }

  return (
    <div className="metrics-outer-container">
      {/* Retro Index Card / Typewriter Certificate overlay */}
      <div className="metrics-card-paper">
        {/* Rivets / Pins in the corner of index card */}
        <div className="card-rivet tl" />
        <div className="card-rivet tr" />
        <div className="card-rivet bl" />
        <div className="card-rivet br" />

        {/* Vintage header */}
        <div className="metrics-header">
          <h3 className="metrics-title">TYPING PERFORMANCE CARD</h3>
          <div className="card-serial">NO. {attemptNumber || 1}</div>
          <div className="typewriter-line" />
        </div>

        {/* 2-Column Row Layout (Left: metrics stacked, Right: Diagnostics details) */}
        <div className="metrics-layout-row">
          {/* Left Column: Stacked metrics */}
          <div className="metrics-left-column">
            {/* Words Per Minute (WPM) */}
            <div className="metric-box-item">
              <span className="metric-label">WORDS / MIN</span>
              <span className="metric-value wpm-val">{metrics.wpm}</span>
              <span className="metric-subtext">5-char standard</span>
            </div>

            {/* Letters Per Minute (LPM) */}
            <div className="metric-box-item">
              <span className="metric-label">LETTERS / MIN</span>
              <span className="metric-value lpm-val">{metrics.lpm}</span>
              <span className="metric-subtext">total correct keys</span>
            </div>

            {/* Accuracy */}
            <div className="metric-box-item">
              <span className="metric-label">ACCURACY</span>
              <span className="metric-value accuracy-val">{metrics.accuracy}%</span>
              <span className="metric-subtext">{metrics.correctKeystrokes} of {metrics.totalKeystrokes} keys</span>
            </div>
          </div>

          {/* Right Column: Keystrokes Details grid structure */}
          <div className="metrics-right-column">
            <div className="metric-box-item details-box">
              <span className="metric-label">DIAGNOSTICS</span>
              <div className="diagnostics-list">
                <div className="diag-row">
                  <span>TEST DURATION:</span>
                  <span className="diag-val">{metrics.duration} SECONDS</span>
                </div>
                <div className="diag-row">
                  <span>CORRECT STRIKES:</span>
                  <span className="diag-val">{metrics.correctKeystrokes}</span>
                </div>
                <div className="diag-row">
                  <span>ERROR STRIKES:</span>
                  <span className="diag-val">{metrics.incorrectKeystrokes}</span>
                </div>
                <div className="diag-row" style={{ marginBottom: '15px' }}>
                  <span>TOTAL KEYSTROKES:</span>
                  <span className="diag-val">{metrics.totalKeystrokes}</span>
                </div>
                
                {/* User lifetime average diagnostics */}
                <div className="diag-row" style={{ color: 'var(--color-gold)', borderBottom: '1px solid rgba(140, 130, 108, 0.25)', paddingBottom: '4px', fontWeight: 'bold' }}>
                  <span>LIFETIME STATISTICS</span>
                  <span></span>
                </div>
                <div className="diag-row" style={{ paddingLeft: '4px' }}>
                  <span>PREV. AVG SPEED:</span>
                  <span className="diag-val">{prevWpm > 0 ? `${prevWpm} WPM` : 'N/A'}</span>
                </div>
                <div className="diag-row" style={{ paddingLeft: '4px' }}>
                  <span>PREV. AVG ACCURACY:</span>
                  <span className="diag-val">{prevAccuracy > 0 ? `${prevAccuracy}%` : 'N/A'}</span>
                </div>
                <div className="diag-row" style={{ paddingLeft: '4px', color: 'var(--color-gold)', fontWeight: 'bold' }}>
                  <span>NEW AVG SPEED:</span>
                  <span className="diag-val" style={{ color: 'var(--color-gold)' }}>{targetWpm} WPM</span>
                </div>
                <div className="diag-row" style={{ paddingLeft: '4px', color: 'var(--color-gold)', fontWeight: 'bold' }}>
                  <span>NEW AVG ACCURACY:</span>
                  <span className="diag-val" style={{ color: 'var(--color-gold)' }}>{targetAcc}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vintage red distressed stamp overlay */}
        <div className="ink-stamp-container">
          <div className="ink-stamp-circle">
            <span className="stamp-sub">VERIFIED CLASS</span>
            <span className="stamp-main">{wpmTier}</span>
            <span className="stamp-date">
              {new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Restart / Return Carriage Buttons */}
      <div className="restart-button-row">
        <button 
          className="green-metal-btn" 
          id="restart-typing-btn"
          onClick={onRestart}
        >
          {/* Corner Rivets */}
          <div className="btn-rivet rivet-tl" />
          <div className="btn-rivet rivet-tr" />
          <div className="btn-rivet rivet-bl" />
          <div className="btn-rivet rivet-br" />
          
          <span className="btn-text-content">START NEW SESSION</span>
          
          <svg className="btn-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
