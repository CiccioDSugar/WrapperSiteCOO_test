import { useState, useEffect } from 'react';
import { inputStyle } from '../styles/shared';
import * as Icons from '../components/Icons';
import * as api from '../services/apiService';

const rankColor = (r: number) => r === 1 ? '#FFD700' : r === 2 ? '#C0C0C0' : r === 3 ? '#CD7F32' : 'var(--text-secondary)';

export default function LeaderboardPage() {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard(1, 50).then((data) => {
      if (data?.entries) setEntries(data.entries);
      setLoading(false);
    });
  }, []);

  const filtered = entries.filter((p) => p.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fadeIn" style={{ paddingTop: 'calc(var(--navbar-height) + 40px)', maxWidth: '800px', margin: '0 auto', padding: 'calc(var(--navbar-height) + 40px) 24px 40px' }}>
      <h1 className="font-cinzel" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '32px' }}>Leaderboard</h1>

      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <input className="input-glow" type="text" placeholder="Search players..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, paddingLeft: '44px', background: 'rgba(10,20,40,0.6)', borderRadius: '4px', width: '100%' }} />
        <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}><Icons.Search size={18} /></div>
      </div>

      {loading ? (
        <p className="font-cinzel" style={{ color: 'var(--text-muted)', textAlign: 'center', letterSpacing: '2px' }}>Loading...</p>
      ) : (
        <div style={{ border: '1px solid var(--border-gold)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 80px 80px', padding: '12px 20px', background: 'rgba(200,170,110,0.06)', borderBottom: '1px solid var(--border-gold)' }}>
            {['RANK', 'PLAYER', 'ELO', 'WINS', 'LOSSES'].map((h) => (
              <span key={h} className="font-cinzel" style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1.5px' }}>{h}</span>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No players found</div>
          ) : (
            filtered.map((p) => (
              <div key={p.id} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 100px 80px 80px',
                padding: '14px 20px', alignItems: 'center',
                borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'background 0.15s',
              }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(200,170,110,0.04)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                <span className="font-cinzel" style={{ fontWeight: 800, fontSize: '16px', color: rankColor(p.rank) }}>{p.rank}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={p.avatarUrl} alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${rankColor(p.rank)}` }} />
                  <span className="font-cinzel" style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{p.username}</span>
                </div>
                <span className="font-cinzel" style={{ fontWeight: 700, fontSize: '15px', color: 'var(--gold)' }}>{p.eloCurrent}</span>
                <span style={{ color: 'var(--accent-blue)', fontSize: '14px' }}>{p.totalWins}</span>
                <span style={{ color: 'var(--accent-red)', fontSize: '14px' }}>{p.totalLosses}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
