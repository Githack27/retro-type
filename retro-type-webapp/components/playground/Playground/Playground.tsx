'use client';

import React, { useState } from 'react';
import Typer, { TypingMetrics } from '@/components/playground/Typer/Typer';
import Metrics from '@/components/playground/Metrics/Metrics';
import { navigationService } from '@/services/navigation';
import './Playground.css';

export default function Playground() {
  const [metrics, setMetrics] = useState<TypingMetrics | null>(null);
  const [attemptNumber, setAttemptNumber] = useState<number>(1);
  const [guestAttemptCount, setGuestAttemptCount] = useState<number>(1);
  const [guestSessions, setGuestSessions] = useState<{ wpm: number; accuracy: number }[]>([]);
  const [prevWpm, setPrevWpm] = useState<number>(0);
  const [prevAccuracy, setPrevAccuracy] = useState<number>(0);
  const [newWpm, setNewWpm] = useState<number>(0);
  const [newAccuracy, setNewAccuracy] = useState<number>(0);

  const handleTestComplete = async (finalMetrics: TypingMetrics) => {
    setMetrics(finalMetrics);

    if (finalMetrics.failed) {
      return;
    }

    if (navigationService.getIsLoggedIn()) {
      try {
        const response = await fetch('/api/typing/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            wpm: finalMetrics.wpm,
            accuracy: finalMetrics.accuracy,
            totalKeystrokes: finalMetrics.totalKeystrokes,
            correctKeystrokes: finalMetrics.correctKeystrokes,
            incorrectKeystrokes: finalMetrics.incorrectKeystrokes,
            duration: finalMetrics.duration,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.attemptNumber !== undefined) {
            setAttemptNumber(data.attemptNumber);
            setPrevWpm(data.prevWpm);
            setPrevAccuracy(data.prevAccuracy);
            setNewWpm(data.newWpm);
            setNewAccuracy(data.newAccuracy);
          }
        }
      } catch (error) {
        console.error('Failed to save typing session:', error);
      }
    } else {
      const prevCount = guestSessions.length;
      let sumWpm = 0;
      let sumAcc = 0;
      guestSessions.forEach(s => {
        sumWpm += s.wpm;
        sumAcc += s.accuracy;
      });

      const pWpm = prevCount > 0 ? Math.round(sumWpm / prevCount) : 0;
      const pAcc = prevCount > 0 ? Math.round(sumAcc / prevCount) : 0;

      const updatedSessions = [...guestSessions, { wpm: finalMetrics.wpm, accuracy: finalMetrics.accuracy }];
      const newCount = updatedSessions.length;
      const nWpm = Math.round((sumWpm + finalMetrics.wpm) / newCount);
      const nAcc = Math.round((sumAcc + finalMetrics.accuracy) / newCount);

      setPrevWpm(pWpm);
      setPrevAccuracy(pAcc);
      setNewWpm(nWpm);
      setNewAccuracy(nAcc);
      setAttemptNumber(guestAttemptCount);

      setGuestSessions(updatedSessions);
      setGuestAttemptCount(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setMetrics(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      
      <div className="welcome-divider-container" style={{ marginBottom: '15px' }}>
        <div className="divider-line" />
        <span className="welcome-text">PRACTICE ARENA</span>
        <div className="divider-line" />
      </div>

      
      <div className="playground-container-overlay">
        {!metrics ? (
          <Typer onComplete={handleTestComplete} />
        ) : (
          <div style={{ width: '100%' }}>
            <Metrics 
              metrics={metrics} 
              attemptNumber={attemptNumber} 
              prevWpm={prevWpm}
              prevAccuracy={prevAccuracy}
              newWpm={newWpm}
              newAccuracy={newAccuracy}
              onRestart={handleRestart} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
