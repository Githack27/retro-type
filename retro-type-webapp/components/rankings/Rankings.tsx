import React, { useEffect, useState } from 'react';
import BadgeIcon from '../shared/BadgeIcon';

interface LeaderboardEntry {
  username: string;
  maxWpm: number;
  maxAccuracy: number;
  totalSessions: number;
  badges: string[];
}

export default function Rankings() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/rankings');
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
      }
    } catch (e) {
      console.error('Failed to load leaderboard:', e);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeClass = (badgeName: string) => {
    const name = badgeName.toLowerCase();
    if (name.includes('legend')) {
      return 'badge-gold';
    }
    if (
      name.includes('maestro') ||
      name.includes('author') ||
      name.includes('scribe') ||
      name.includes('precision') ||
      name.includes('grandmaster')
    ) {
      return 'badge-platinum';
    }
    if (
      name.includes('typist') ||
      name.includes('apprentice') ||
      name.includes('writer') ||
      name.includes('sniper') ||
      name.includes('wordsmith')
    ) {
      return 'badge-silver';
    }
    return 'badge-bronze'; // Novice, Steady Fingers, Keyboard Enthusiast
  };

  const getBadgeAbbreviation = (badgeName: string) => {
    const name = badgeName.toUpperCase();
    if (name.includes('STEADY')) return 'ACC';
    if (name.includes('SNIPER')) return 'SNIP';
    if (name.includes('LASER')) return 'LSR';
    if (name.includes('KEYBOARD')) return 'KEY';
    if (name.includes('WORDSMITH')) return 'WRD';
    if (name.includes('GRANDMASTER')) return 'GMR';
    return name.slice(0, 3);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 20px' }}>
      <div className="welcome-divider-container" style={{ marginBottom: '15px' }}>
        <div className="divider-line" />
        <span className="welcome-text">GLOBAL LEADERBOARD</span>
        <div className="divider-line" />
      </div>

      <div className="metrics-card-paper" style={{ width: '100%', maxWidth: '850px', background: 'rgba(15, 15, 14, 0.85)', padding: '30px' }}>
        <div className="card-rivet tl" />
        <div className="card-rivet tr" />
        <div className="card-rivet bl" />
        <div className="card-rivet br" />

        <div className="metrics-header" style={{ marginBottom: '25px' }}>
          <h3 className="metrics-title">TOP OPERATORS LIST</h3>
          <div className="typewriter-line" />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '40px 0', fontFamily: 'monospace' }}>
            TRANSMITTING CURRENT STANDINGS...
          </div>
        ) : leaderboard.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '40px 0', fontFamily: 'monospace' }}>
            NO RECORDED MISSIONS YET. BE THE FIRST ON THE LEADERBOARD!
          </div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px dashed var(--color-muted)', color: 'var(--color-gold)' }}>
                  <th style={{ padding: '10px 5px' }}>RANK</th>
                  <th style={{ padding: '10px 5px' }}>OPERATOR</th>
                  <th style={{ padding: '10px 5px', textAlign: 'right' }}>PB SPEED</th>
                  <th style={{ padding: '10px 5px', textAlign: 'right' }}>PB ACCURACY</th>
                  <th style={{ padding: '10px 5px', textAlign: 'right' }}>SESSIONS</th>
                  <th style={{ padding: '10px 15px' }}>BADGES</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr 
                    key={index} 
                    style={{ 
                      borderBottom: '1px solid rgba(140, 130, 108, 0.2)',
                      color: index === 0 ? 'var(--color-cream)' : 'inherit',
                      fontWeight: index < 3 ? 'bold' : 'normal'
                    }}
                  >
                    <td style={{ padding: '12px 5px', color: index < 3 ? 'var(--color-gold)' : 'var(--color-muted)' }}>
                      #{index + 1}
                    </td>
                    <td style={{ padding: '12px 5px' }}>
                      {entry.username} {index === 0 && '👑'}
                    </td>
                    <td style={{ padding: '12px 5px', textAlign: 'right', color: 'var(--color-cream)' }}>
                      {entry.maxWpm} WPM
                    </td>
                    <td style={{ padding: '12px 5px', textAlign: 'right' }}>
                      {entry.maxAccuracy}%
                    </td>
                    <td style={{ padding: '12px 5px', textAlign: 'right', color: 'var(--color-muted)' }}>
                      {entry.totalSessions}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {entry.badges.slice(0, 3).map((badge, bidx) => {
                          const shortBadge = badge.split(' (')[0];
                          const badgeClass = getBadgeClass(shortBadge);
                          return (
                            <span 
                              key={bidx} 
                              className={`badge-card-mini ${badgeClass}`}
                              title={shortBadge}
                            >
                              <BadgeIcon name={shortBadge} />
                            </span>
                          );
                        })}
                        {entry.badges.length > 3 && (
                          <span style={{ fontSize: '8px', color: 'var(--color-muted)' }}>
                            +{entry.badges.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
