import React, { useEffect, useState } from 'react';
import BadgeIcon from '../shared/BadgeIcon';

interface LeaderboardEntry {
  username: string;
  maxWpm: number;
  maxAccuracy: number;
  totalSessions: number;
  badges: string[];
}

// Ordered from highest to lowest prestige
const BADGE_PRIORITY: string[] = [
  'legend',
  'maestro',
  'author',
  'laser precision',
  'grandmaster',
  'scribe',
  'sniper',
  'wordsmith',
  'typist',
  'writer',
  'steady fingers',
  'keyboard enthusiast',
  'apprentice',
  'novice',
];

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

  /** Return the single highest-prestige badge from a user's badge list */
  const getHighestBadge = (badges: string[]): string | null => {
    if (!badges || badges.length === 0) return null;
    const normalized = badges.map((b) => b.split(' (')[0].trim());
    for (const priority of BADGE_PRIORITY) {
      const match = normalized.find((b) => b.toLowerCase() === priority);
      if (match) return match;
    }
    return normalized[0]; // fallback to first if none matched
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 20px' }}>
      <div className="welcome-divider-container" style={{ marginBottom: '45px' }}>
        <div className="divider-line" />
        <span className="welcome-text" style={{ fontSize: '42px', letterSpacing: '12px' }}>GLOBAL LEADERBOARD</span>
        <div className="divider-line" />
      </div>

      <div className="metrics-card-paper" style={{ width: '100%', maxWidth: '2550px', background: 'rgba(15, 15, 14, 0.85)', padding: '90px' }}>
        <div className="card-rivet tl" style={{ width: '24px', height: '24px', top: '36px', left: '36px' }} />
        <div className="card-rivet tr" style={{ width: '24px', height: '24px', top: '36px', right: '36px' }} />
        <div className="card-rivet bl" style={{ width: '24px', height: '24px', bottom: '36px', left: '36px' }} />
        <div className="card-rivet br" style={{ width: '24px', height: '24px', bottom: '36px', right: '36px' }} />

        <div className="metrics-header" style={{ marginBottom: '75px' }}>
          <h3 className="metrics-title" style={{ fontSize: '66px', letterSpacing: '4.5px' }}>TOP OPERATORS LIST</h3>
          <div className="typewriter-line" style={{ height: '3px' }} />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '120px 0', fontFamily: 'monospace', fontSize: '36px' }}>
            TRANSMITTING CURRENT STANDINGS...
          </div>
        ) : leaderboard.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '120px 0', fontFamily: 'monospace', fontSize: '36px' }}>
            NO RECORDED MISSIONS YET. BE THE FIRST ON THE LEADERBOARD!
          </div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace', fontSize: '36px' }}>
              <thead>
                <tr style={{ borderBottom: '6px dashed var(--color-muted)', color: 'var(--color-gold)' }}>
                  <th style={{ padding: '30px 15px' }}>RANK</th>
                  <th style={{ padding: '30px 15px' }}>OPERATOR</th>
                  <th style={{ padding: '30px 15px', textAlign: 'right' }}>PB SPEED</th>
                  <th style={{ padding: '30px 15px', textAlign: 'right' }}>PB ACCURACY</th>
                  <th style={{ padding: '30px 15px', textAlign: 'right' }}>SESSIONS</th>
                  <th style={{ padding: '30px 45px' }}>TOP BADGE</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => {
                  const highestBadge = getHighestBadge(entry.badges);
                  return (
                    <tr
                      key={index}
                      style={{
                        borderBottom: '3px solid rgba(140, 130, 108, 0.2)',
                        color: index === 0 ? 'var(--color-cream)' : 'inherit',
                        fontWeight: index < 3 ? 'bold' : 'normal',
                      }}
                    >
                      <td style={{ padding: '36px 15px', color: index < 3 ? 'var(--color-gold)' : 'var(--color-muted)' }}>
                        #{index + 1}
                      </td>
                      <td style={{ padding: '36px 15px' }}>
                        {entry.username} {index === 0 && '👑'}
                      </td>
                      <td style={{ padding: '36px 15px', textAlign: 'right', color: 'var(--color-cream)' }}>
                        {entry.maxWpm} WPM
                      </td>
                      <td style={{ padding: '36px 15px', textAlign: 'right' }}>
                        {entry.maxAccuracy}%
                      </td>
                      <td style={{ padding: '36px 15px', textAlign: 'right', color: 'var(--color-muted)' }}>
                        {entry.totalSessions}
                      </td>
                      <td style={{ padding: '36px 45px' }}>
                        {highestBadge ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                            <span
                              className={`badge-card-mini ${getBadgeClass(highestBadge)}`}
                              title={highestBadge}
                              style={{ width: '90px', height: '90px' }}
                            >
                              <BadgeIcon name={highestBadge} />
                            </span>
                            <span style={{ fontSize: '30px', color: 'var(--color-cream)', letterSpacing: '1px' }}>
                              {highestBadge}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '30px', color: 'var(--color-muted)' }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
