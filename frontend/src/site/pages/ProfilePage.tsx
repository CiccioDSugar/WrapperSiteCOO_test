import { useState, useEffect } from 'react';
import { inputStyle, sectionTitleStyle } from '../styles/shared';
import * as Icons from '../components/Icons';
import * as api from '../services/apiService';

const statusColor = (s: string) => s === 'ONLINE' ? '#2ECC71' : s === 'IN_GAME' ? 'var(--accent-blue)' : 'var(--text-muted)';

function StatBox({ label, value, color = 'var(--gold)' }: { label: string; value: string | number; color?: string }) {
  return (
    <div style={{ padding: '20px', background: 'rgba(10,20,40,0.5)', border: '1px solid var(--border-subtle)', borderRadius: '4px', textAlign: 'center' }}>
      <div className="font-cinzel" style={{ fontSize: '24px', fontWeight: 800, color, marginBottom: '4px' }}>{value}</div>
      <div className="font-cinzel" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1.5px' }}>{label}</div>
    </div>
  );
}

function EditableField({ label, value, isEditing, onEdit, onSave, onCancel, tempVal, setTempVal }: {
  label: string; value: string; isEditing: boolean;
  onEdit: () => void; onSave: () => void; onCancel: () => void;
  tempVal: string; setTempVal: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(10,20,40,0.5)', border: '1px solid var(--border-subtle)', borderRadius: '4px', marginBottom: '8px' }}>
      <div style={{ flex: 1 }}>
        <div className="font-cinzel" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: '4px' }}>{label}</div>
        {isEditing ? (
          <input className="input-glow" value={tempVal} onChange={(e) => setTempVal(e.target.value)} style={{ ...inputStyle, padding: '6px 10px', fontSize: '14px', width: '100%' }} autoFocus />
        ) : (
          <div style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{value}</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '6px', marginLeft: '12px' }}>
        {isEditing ? (
          <>
            <button onClick={onSave} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', padding: '4px', display: 'flex' }}><Icons.Check size={18} /></button>
            <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', padding: '4px', display: 'flex' }}><Icons.X size={18} /></button>
          </>
        ) : (
          <button onClick={() => { setTempVal(value); onEdit(); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', display: 'flex' }}><Icons.Edit size={16} /></button>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [tempVal, setTempVal] = useState('');

  useEffect(() => {
    Promise.all([api.getMyProfile(), api.getMyStats(), api.getMySettings()])
      .then(([p, s, set]) => { if (p) setProfile(p); if (s) setStats(s); if (set) setSettings(set); })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveUsername = async () => { if (await api.updateUsername(tempVal)) setProfile((p: any) => ({ ...p, username: tempVal })); setEditingUsername(false); };
  const handleSaveEmail = async () => { if (await api.updateEmail(tempVal)) setProfile((p: any) => ({ ...p, email: tempVal })); setEditingEmail(false); };

  if (loading) return <div style={{ paddingTop: 'calc(var(--navbar-height) + 80px)', textAlign: 'center' }}><p className="font-cinzel" style={{ color: 'var(--text-muted)', letterSpacing: '2px' }}>Loading...</p></div>;

  const username = profile?.username || 'Unknown';
  const email = profile?.email || '';
  const avatarUrl = profile?.avatarUrl || `https://api.dicebear.com/9.x/pixel-art/svg?seed=${username}`;
  const userStatus = profile?.status || 'OFFLINE';
  const createdAt = profile?.createdAt || '2025-01-01';
  const s = stats || { eloCurrent: 0, eloPeak: 0, totalWins: 0, totalLosses: 0, totalDraws: 0, bestWinStreak: 0, totalKills: 0, totalDeaths: 1, characterStats: [] };
  const total = s.totalWins + s.totalLosses + s.totalDraws;
  const winRate = total > 0 ? Math.round((s.totalWins / total) * 100) : 0;
  const sec = settings || { is2faEnabled: false, isEmailVerified: false, linkedProviders: [] };

  return (
    <div className="animate-fadeIn" style={{ paddingTop: 'var(--navbar-height)', maxWidth: '800px', margin: '0 auto', padding: 'var(--navbar-height) 24px 60px' }}>
      <div id="profile-settings" style={{ paddingTop: '40px', scrollMarginTop: 'var(--navbar-height)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
            <img src={avatarUrl} alt="avatar" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '3px solid var(--gold)', boxShadow: '0 0 30px var(--gold-glow)' }} />
            <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: statusColor(userStatus), border: '3px solid var(--bg-darkest)' }} />
          </div>
          <h1 className="font-cinzel" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '2px' }}>{username}</h1>
          <p className="font-cinzel" style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '1px', marginTop: '4px' }}>Member since {new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
        </div>
        <h2 style={{ ...sectionTitleStyle, fontSize: '22px', marginBottom: '24px' }}>Settings & Personalization</h2>
        <EditableField label="USERNAME" value={username} isEditing={editingUsername} tempVal={tempVal} setTempVal={setTempVal} onEdit={() => setEditingUsername(true)} onSave={handleSaveUsername} onCancel={() => setEditingUsername(false)} />
        <EditableField label="EMAIL" value={email} isEditing={editingEmail} tempVal={tempVal} setTempVal={setTempVal} onEdit={() => setEditingEmail(true)} onSave={handleSaveEmail} onCancel={() => setEditingEmail(false)} />
      </div>

      <div id="profile-stats" style={{ paddingTop: '80px', scrollMarginTop: 'var(--navbar-height)' }}>
        <h2 style={{ ...sectionTitleStyle, fontSize: '22px', marginBottom: '24px' }}>Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <StatBox label="ELO" value={s.eloCurrent} /><StatBox label="PEAK ELO" value={s.eloPeak} color="var(--gold-light)" /><StatBox label="WIN RATE" value={`${winRate}%`} color="var(--accent-blue)" /><StatBox label="BEST STREAK" value={s.bestWinStreak} color="var(--accent-blue)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
          <StatBox label="WINS" value={s.totalWins} color="#2ECC71" /><StatBox label="LOSSES" value={s.totalLosses} color="var(--accent-red)" /><StatBox label="K/D RATIO" value={s.totalDeaths > 0 ? (s.totalKills / s.totalDeaths).toFixed(2) : '0'} />
        </div>
        {s.characterStats?.length > 0 && (<>
          <h3 className="font-cinzel" style={{ fontSize: '14px', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}>By Champion</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {s.characterStats.map((cs: any) => (
              <div key={cs.characterName} style={{ padding: '20px', background: 'rgba(10,20,40,0.5)', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{cs.characterName?.toLowerCase() === 'zeus' ? '⚡' : '🔥'}</span>
                  <span className="font-cinzel" style={{ fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>{cs.characterName}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div><div className="font-cinzel" style={{ fontSize: '18px', fontWeight: 700, color: '#2ECC71' }}>{cs.wins}</div><div className="font-cinzel" style={{ fontSize: '9px', color: 'var(--text-muted)' }}>WINS</div></div>
                  <div><div className="font-cinzel" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-red)' }}>{cs.losses}</div><div className="font-cinzel" style={{ fontSize: '9px', color: 'var(--text-muted)' }}>LOSSES</div></div>
                  <div><div className="font-cinzel" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{cs.deaths > 0 ? (cs.kills / cs.deaths).toFixed(1) : '0'}</div><div className="font-cinzel" style={{ fontSize: '9px', color: 'var(--text-muted)' }}>K/D</div></div>
                </div>
              </div>
            ))}
          </div>
        </>)}
      </div>

      <div id="profile-friends" style={{ paddingTop: '80px', scrollMarginTop: 'var(--navbar-height)' }}>
        <h2 style={{ ...sectionTitleStyle, fontSize: '22px', marginBottom: '24px' }}>Friends</h2>
        <p className="font-cinzel" style={{ color: 'var(--text-muted)', textAlign: 'center', letterSpacing: '2px', fontSize: '13px' }}>Coming soon</p>
      </div>

      <div id="profile-security" style={{ paddingTop: '80px', paddingBottom: '40px', scrollMarginTop: 'var(--navbar-height)' }}>
        <h2 style={{ ...sectionTitleStyle, fontSize: '22px', marginBottom: '24px' }}>Security & 2FA</h2>
        <div style={{ padding: '24px', background: 'rgba(10,20,40,0.5)', border: '1px solid var(--border-subtle)', borderRadius: '4px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="font-cinzel" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Two-Factor Authentication</div>
              <div style={{ fontSize: '13px', color: sec.is2faEnabled ? '#2ECC71' : 'var(--text-secondary)' }}>{sec.is2faEnabled ? '✓ Enabled' : 'Not enabled'}</div>
            </div>
            <button className="btn-press" style={{ padding: '8px 20px', background: sec.is2faEnabled ? 'none' : 'linear-gradient(180deg, var(--gold), var(--gold-dark))', border: sec.is2faEnabled ? '1px solid var(--accent-red)' : 'none', borderRadius: '2px', color: sec.is2faEnabled ? 'var(--accent-red)' : 'var(--bg-darkest)', fontFamily: "'Cinzel', serif", fontSize: '11px', fontWeight: 700, letterSpacing: '1px', cursor: 'pointer' }}>{sec.is2faEnabled ? 'DISABLE' : 'ENABLE'}</button>
          </div>
        </div>
        <div style={{ padding: '24px', background: 'rgba(10,20,40,0.5)', border: '1px solid var(--border-subtle)', borderRadius: '4px', marginBottom: '12px' }}>
          <div className="font-cinzel" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Email Verification</div>
          <div style={{ fontSize: '13px', color: sec.isEmailVerified ? '#2ECC71' : 'var(--accent-red)' }}>{sec.isEmailVerified ? '✓ Verified' : '✗ Not verified'}</div>
        </div>
        <div style={{ padding: '24px', background: 'rgba(10,20,40,0.5)', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="font-cinzel" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Linked Accounts</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                {sec.linkedProviders?.includes('GOOGLE') ? (<><Icons.Google size={16} /><span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Google — Connected</span></>) : (<span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No providers linked</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
