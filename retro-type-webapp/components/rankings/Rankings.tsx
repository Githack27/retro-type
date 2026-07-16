import React, { useEffect, useState } from 'react';
import BadgeIcon from '../shared/BadgeIcon';

interface LeaderboardEntry {
  username: string;
  maxWpm: number;
  maxAccuracy: number;
  totalSessions: number;
  badges: string[];
}
const BADGE_PRIORITY: string[] = [
  'legend',
  'maestro',
  'author',
  'scribe',
  'typist',
  'writer',
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

  
  const getHighestBadge = (badges: string[]): string | null => {
    if (!badges || badges.length === 0) return null;
    const normalized = badges.map((b) => b.split(' (')[0].trim());
    for (const priority of BADGE_PRIORITY) {
      const match = normalized.find((b) => b.toLowerCase() === priority);
      if (match) return match;
    }
    return normalized[0];
  };

  const getBadgeClass = (badgeName: string | null) => {
    if (!badgeName) return 'badge-bronze';
    const name = badgeName.toLowerCase();
    if (name.includes('legend')) {
      return 'badge-gold';
    }
    if (
      name.includes('maestro') ||
      name.includes('author') ||
      name.includes('scribe')
    ) {
      return 'badge-platinum';
    }
    if (
      name.includes('typist') ||
      name.includes('writer') ||
      name.includes('apprentice')
    ) {
      return 'badge-silver';
    }
    return 'badge-bronze';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 20px' }}>
      <div className="welcome-divider-container" style={{ marginBottom: '22px' }}>
        <div className="divider-line" />
        <span className="welcome-text" style={{ fontSize: '21px', letterSpacing: '6px' }}>GLOBAL LEADERBOARD</span>
        <div className="divider-line" />
      </div>

      <div className="metrics-card-paper" style={{ width: '100%', maxWidth: '1275px', background: 'rgba(15, 15, 14, 0.85)', padding: '45px' }}>
        <div className="card-rivet tl" style={{ width: '12px', height: '12px', top: '18px', left: '18px' }} />
        <div className="card-rivet tr" style={{ width: '12px', height: '12px', top: '18px', right: '18px' }} />
        <div className="card-rivet bl" style={{ width: '12px', height: '12px', bottom: '18px', left: '18px' }} />
        <div className="card-rivet br" style={{ width: '12px', height: '12px', bottom: '18px', right: '18px' }} />

        <div className="metrics-header" style={{ marginBottom: '38px' }}>
          <h3 className="metrics-title" style={{ fontSize: '33px', letterSpacing: '2.25px' }}>TOP OPERATORS LIST</h3>
          <div className="typewriter-line" style={{ height: '2px' }} />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '60px 0', fontFamily: 'monospace', fontSize: '18px' }}>
            TRANSMITTING CURRENT STANDINGS...
          </div>
        ) : leaderboard.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '60px 0', fontFamily: 'monospace', fontSize: '18px' }}>
            NO RECORDED MISSIONS YET. BE THE FIRST ON THE LEADERBOARD!
          </div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace', fontSize: '18px' }}>
              <thead>
                <tr style={{ borderBottom: '3px dashed var(--color-muted)', color: 'var(--color-gold)' }}>
                  <th style={{ padding: '15px 8px' }}>RANK</th>
                  <th style={{ padding: '15px 8px' }}>OPERATOR</th>
                  <th style={{ padding: '15px 8px', textAlign: 'right' }}>PB SPEED</th>
                  <th style={{ padding: '15px 8px', textAlign: 'right' }}>PB ACCURACY</th>
                  <th style={{ padding: '15px 8px', textAlign: 'right' }}>SESSIONS</th>
                  <th style={{ padding: '15px 22px' }}>TOP BADGE</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => {
                  const highestBadge = getHighestBadge(entry.badges);
                  return (
                    <tr
                      key={index}
                      style={{
                        borderBottom: '1.5px solid rgba(140, 130, 108, 0.2)',
                        color: index === 0 ? 'var(--color-cream)' : 'inherit',
                        fontWeight: index < 3 ? 'bold' : 'normal',
                      }}
                    >
                      <td style={{ padding: '18px 8px', color: index < 3 ? 'var(--color-gold)' : 'var(--color-muted)' }}>
                        #{index + 1}
                      </td>
                      <td style={{ padding: '18px 8px' }}>
                        {entry.username} {index === 0 && '👑'}
                      </td>
                      <td style={{ padding: '18px 8px', textAlign: 'right', color: 'var(--color-cream)' }}>
                        {entry.maxWpm} WPM
                      </td>
                      <td style={{ padding: '18px 8px', textAlign: 'right' }}>
                        {entry.maxAccuracy}%
                      </td>
                      <td style={{ padding: '18px 8px', textAlign: 'right', color: 'var(--color-muted)' }}>
                        {entry.totalSessions}
                      </td>
                      <td style={{ padding: '18px 22px' }}>
                        {highestBadge ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                            <span
                              className={`badge-card-mini ${getBadgeClass(highestBadge)}`}
                              title={highestBadge}
                              style={{ width: '45px', height: '45px' }}
                            >
                              <BadgeIcon name={highestBadge} />
                            </span>
                            <span style={{ fontSize: '15px', color: 'var(--color-cream)', letterSpacing: '0.5px' }}>
                              {highestBadge}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '15px', color: 'var(--color-muted)' }}>—</span>
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
