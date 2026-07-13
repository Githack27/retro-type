'use client';

import React, { useEffect, useState } from 'react';
import { navigationService } from '@/services/navigation';
import { useAuth } from '@/hooks/useNavigation';

export default function Dashboard() {
  const { isLoggedIn, userName } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [badges, setBadges] = useState<string[]>([]);
  const [heatmap, setHeatmap] = useState<{ [date: string]: number }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user navigates to dashboard but is not logged in, redirect them home
    if (!isLoggedIn) {
      navigationService.navigate('home');
      return;
    }
    fetchDashboardData();
  }, [isLoggedIn]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const statsRes = await fetch('/api/typing/stats');
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
        setBadges(data.badges);
      }

      const heatmapRes = await fetch('/api/typing/heatmap');
      if (heatmapRes.ok) {
        const heatmapData = await heatmapRes.json();
        const lookup: { [date: string]: number } = {};
        heatmapData.forEach((item: any) => {
          lookup[item.date] = item.count;
        });
        setHeatmap(lookup);
      }
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const generateHeatmapDates = () => {
    const dates = [];
    const today = new Date();
    // last 60 days
    for (let i = 59; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getHeatmapColor = (count: number) => {
    if (!count) return '#1a1a17';
    if (count === 1) return 'rgba(197, 155, 39, 0.25)';
    if (count === 2) return 'rgba(197, 155, 39, 0.55)';
    return 'var(--color-gold)';
  };

  const heatmapDates = generateHeatmapDates();

  const getBadgeClass = (badgeName: string) => {
    const name = badgeName.toLowerCase();
    if (name.includes('legend') || name.includes('maestro')) {
      return 'badge-platinum';
    }
    if (
      name.includes('typist') || 
      name.includes('scribe') || 
      name.includes('author') || 
      name.includes('precision') || 
      name.includes('grandmaster')
    ) {
      return 'badge-gold';
    }
    if (
      name.includes('apprentice') || 
      name.includes('writer') || 
      name.includes('sniper') || 
      name.includes('wordsmith')
    ) {
      return 'badge-silver';
    }
    return 'badge-bronze'; // Novice, Steady Fingers, Keyboard Enthusiast
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 20px' }}>
      <div className="welcome-divider-container" style={{ marginBottom: '15px' }}>
        <div className="divider-line" />
        <span className="welcome-text">OPERATOR STATUS</span>
        <div className="divider-line" />
      </div>

      <h1 className="center-logo-title" style={{ fontSize: '32px', margin: '10px 0 20px 0' }}>
        Welcome back, <span className="retro-part">{userName}</span>
      </h1>

      <div className="dashboard-grid">
        {/* LEFT: Stats & Badges */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <span>Performance Card</span>
            <span style={{ fontSize: '9px', color: 'var(--color-muted)' }}>CALLSIGN: {userName}</span>
          </div>
          
          {loading || !stats ? (
            <div style={{ textAlign: 'center', fontFamily: 'monospace', color: 'var(--color-muted)', padding: '20px 0' }}>
              LOADING TELEMETRY DATA...
            </div>
          ) : (
            <div>
              <div className="stats-grid-row" style={{ marginBottom: '25px' }}>
                <div className="stat-item">
                  <span className="stat-item-label">Total Sessions</span>
                  <span className="stat-item-value">{stats.totalSessions}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item-label">Avg Speed</span>
                  <span className="stat-item-value">{stats.avgWpm} WPM</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item-label">Avg Accuracy</span>
                  <span className="stat-item-value">{stats.avgAccuracy}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item-label">Personal Best</span>
                  <span className="stat-item-value" style={{ color: 'var(--color-gold)' }}>{stats.personalBestWpm} WPM</span>
                </div>
              </div>

              <div className="dashboard-card-title" style={{ borderBottom: '1px dashed rgba(140,130,108,0.3)', margin: '15px 0 10px 0' }}>
                <span>Badges Earned</span>
              </div>

              <div className="badges-flex">
                {badges.length === 0 ? (
                  <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontFamily: 'monospace', padding: '5px 0' }}>
                    No badges awarded yet. Complete typing tests to earn metrics badges.
                  </div>
                ) : (
                  badges.map((badge, idx) => (
                    <span key={idx} className={`badge-card ${getBadgeClass(badge)}`}>
                      {badge}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Heatmap & Actions */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="dashboard-card-title">
              <span>Communication Log</span>
              <span style={{ fontSize: '9px', color: 'var(--color-muted)' }}>LAST 60 DAYS</span>
            </div>

            <div className="heatmap-container">
              {heatmapDates.map((dateStr) => {
                const count = heatmap[dateStr] || 0;
                return (
                  <div
                    key={dateStr}
                    className="heatmap-day-box"
                    style={{ backgroundColor: getHeatmapColor(count) }}
                  >
                    <span className="heatmap-tooltip">
                      {dateStr}: {count} {count === 1 ? 'session' : 'sessions'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="heatmap-legend">
              <span>LESS</span>
              <div className="legend-box" style={{ backgroundColor: '#1a1a17' }} />
              <div className="legend-box" style={{ backgroundColor: 'rgba(197, 155, 39, 0.25)' }} />
              <div className="legend-box" style={{ backgroundColor: 'rgba(197, 155, 39, 0.55)' }} />
              <div className="legend-box" style={{ backgroundColor: 'var(--color-gold)' }} />
              <span>MORE</span>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <button 
              className="green-metal-btn" 
              onClick={() => navigationService.navigate('playground')}
              style={{ width: '100%', maxWidth: '280px' }}
            >
              <div className="btn-rivet rivet-tl" />
              <div className="btn-rivet rivet-tr" />
              <div className="btn-rivet rivet-bl" />
              <div className="btn-rivet rivet-br" />
              <span className="btn-text-content">ENGAGE PRACTICE</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
