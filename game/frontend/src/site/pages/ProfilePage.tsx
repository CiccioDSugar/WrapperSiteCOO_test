import { useState } from 'react';
import { inputStyle, sectionTitleStyle } from '../styles/shared';
import * as Icons from '../components/Icons';

// TODO: sostituire con dati reali dall'API di Renato
const MOCK_USER = {
  avatarUrl: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Olympian_Zeus",
  status: "ONLINE",
  createdAt: "2025-09-15",
};

const MOCK_STATS = {
  eloCurrent: 1450, eloPeak: 1620, totalWins: 87, totalLosses: 43, totalDraws: 5,
  bestWinStreak: 11, totalKills: 340, totalDeaths: 210,
  characterStats: [
    { characterName: "ZEUS", wins: 52, losses: 20, kills: 200, deaths: 100 },
    { characterName: "HADES", wins: 35, losses: 23, kills: 140, deaths: 110 },
  ],
};

const MOCK_FRIENDS = [
  { id: 1, username: "AresBlood", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=AresBlood", status: "ONLINE" },
  { id: 2, username: "AthenaWise", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=AthenaWise", status: "IN_GAME" },
  { id: 3, username: "HermesSpeed", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=HermesSpeed", status: "OFFLINE" },
  { id: 4, username: "PoseidonWave", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=PoseidonWave", status: "ONLINE" },
];

const statusColor = (s: string) => s === "ONLINE" ? "#2ECC71" : s === "IN_GAME" ? "var(--accent-blue)" : "var(--text-muted)";
const statusLabel = (s: string) => s === "ONLINE" ? "Online" : s === "IN_GAME" ? "In Game" : "Offline";

function StatBox({ label, value, color = "var(--gold)" }: { label: string; value: string | number; color?: string }) {
  return (
    <div style={{ padding: "20px", background: "rgba(10,20,40,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "4px", textAlign: "center" }}>
      <div className="font-cinzel" style={{ fontSize: "24px", fontWeight: 800, color, marginBottom: "4px" }}>{value}</div>
      <div className="font-cinzel" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "1.5px" }}>{label}</div>
    </div>
  );
}

function EditableField({ label, value, isEditing, onEdit, onSave, onCancel, tempVal, setTempVal }: {
  label: string; value: string; isEditing: boolean;
  onEdit: () => void; onSave: () => void; onCancel: () => void;
  tempVal: string; setTempVal: (v: string) => void;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 20px", background: "rgba(10,20,40,0.5)",
      border: "1px solid var(--border-subtle)", borderRadius: "4px", marginBottom: "8px",
    }}>
      <div style={{ flex: 1 }}>
        <div className="font-cinzel" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "1.5px", marginBottom: "4px" }}>{label}</div>
        {isEditing ? (
          <input className="input-glow" value={tempVal} onChange={(e) => setTempVal(e.target.value)}
            style={{ ...inputStyle, padding: "6px 10px", fontSize: "14px", width: "100%" }} autoFocus />
        ) : (
          <div style={{ color: "var(--text-primary)", fontSize: "15px" }}>{value}</div>
        )}
      </div>
      <div style={{ display: "flex", gap: "6px", marginLeft: "12px" }}>
        {isEditing ? (
          <>
            <button onClick={onSave} style={{ background: "none", border: "none", color: "var(--accent-blue)", cursor: "pointer", padding: "4px", display: "flex" }}><Icons.Check size={18} /></button>
            <button onClick={onCancel} style={{ background: "none", border: "none", color: "var(--accent-red)", cursor: "pointer", padding: "4px", display: "flex" }}><Icons.X size={18} /></button>
          </>
        ) : (
          <button onClick={() => { setTempVal(value); onEdit(); }} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px", display: "flex" }}><Icons.Edit size={16} /></button>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [username, setUsername] = useState("Olympian_Zeus");
  const [email, setEmail] = useState("zeus@olympus.com");
  const [tempVal, setTempVal] = useState("");

  const s = MOCK_STATS;
  const winRate = Math.round((s.totalWins / (s.totalWins + s.totalLosses + s.totalDraws)) * 100);

  return (
    <div className="animate-fadeIn" style={{ paddingTop: "var(--navbar-height)", maxWidth: "800px", margin: "0 auto", padding: "var(--navbar-height) 24px 60px" }}>

      {/* ─── SETTINGS ─── */}
      <div id="profile-settings" style={{ paddingTop: "40px", scrollMarginTop: "var(--navbar-height)" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
            <img src={MOCK_USER.avatarUrl} alt="avatar" style={{ width: "120px", height: "120px", borderRadius: "50%", border: "3px solid var(--gold)", boxShadow: "0 0 30px var(--gold-glow)" }} />
            <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "20px", height: "20px", borderRadius: "50%", background: statusColor(MOCK_USER.status), border: "3px solid var(--bg-darkest)" }} />
          </div>
          <h1 className="font-cinzel" style={{ fontSize: "28px", fontWeight: 700, color: "var(--gold-light)", letterSpacing: "2px" }}>{username}</h1>
          <p className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "12px", letterSpacing: "1px", marginTop: "4px" }}>
            Member since {new Date(MOCK_USER.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
          </p>
        </div>

        <h2 style={{ ...sectionTitleStyle, fontSize: "22px", marginBottom: "24px" }}>Settings & Personalization</h2>
        <EditableField label="USERNAME" value={username} isEditing={editingUsername} tempVal={tempVal} setTempVal={setTempVal}
          onEdit={() => setEditingUsername(true)} onSave={() => { setUsername(tempVal); setEditingUsername(false); }} onCancel={() => setEditingUsername(false)} />
        <EditableField label="EMAIL" value={email} isEditing={editingEmail} tempVal={tempVal} setTempVal={setTempVal}
          onEdit={() => setEditingEmail(true)} onSave={() => { setEmail(tempVal); setEditingEmail(false); }} onCancel={() => setEditingEmail(false)} />
      </div>

      {/* ─── STATS ─── */}
      <div id="profile-stats" style={{ paddingTop: "80px", scrollMarginTop: "var(--navbar-height)" }}>
        <h2 style={{ ...sectionTitleStyle, fontSize: "22px", marginBottom: "24px" }}>Statistics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
          <StatBox label="ELO" value={s.eloCurrent} />
          <StatBox label="PEAK ELO" value={s.eloPeak} color="var(--gold-light)" />
          <StatBox label="WIN RATE" value={`${winRate}%`} color="var(--accent-blue)" />
          <StatBox label="BEST STREAK" value={s.bestWinStreak} color="var(--accent-blue)" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          <StatBox label="WINS" value={s.totalWins} color="#2ECC71" />
          <StatBox label="LOSSES" value={s.totalLosses} color="var(--accent-red)" />
          <StatBox label="K/D RATIO" value={(s.totalKills / s.totalDeaths).toFixed(2)} />
        </div>

        <h3 className="font-cinzel" style={{ fontSize: "14px", color: "var(--text-secondary)", letterSpacing: "2px", marginBottom: "16px", textTransform: "uppercase" }}>By Champion</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {s.characterStats.map((cs) => (
            <div key={cs.characterName} style={{ padding: "20px", background: "rgba(10,20,40,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "20px" }}>{cs.characterName === "ZEUS" ? "⚡" : "🔥"}</span>
                <span className="font-cinzel" style={{ fontWeight: 700, color: "var(--gold-light)", letterSpacing: "1px" }}>{cs.characterName}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <div><div className="font-cinzel" style={{ fontSize: "18px", fontWeight: 700, color: "#2ECC71" }}>{cs.wins}</div><div className="font-cinzel" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "1px" }}>WINS</div></div>
                <div><div className="font-cinzel" style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent-red)" }}>{cs.losses}</div><div className="font-cinzel" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "1px" }}>LOSSES</div></div>
                <div><div className="font-cinzel" style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>{(cs.kills / cs.deaths).toFixed(1)}</div><div className="font-cinzel" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "1px" }}>K/D</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FRIENDS ─── */}
      <div id="profile-friends" style={{ paddingTop: "80px", scrollMarginTop: "var(--navbar-height)" }}>
        <h2 style={{ ...sectionTitleStyle, fontSize: "22px", marginBottom: "24px" }}>Friends</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {MOCK_FRIENDS.map((f) => (
            <div key={f.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", background: "rgba(10,20,40,0.5)",
              border: "1px solid var(--border-subtle)", borderRadius: "4px", cursor: "pointer", transition: "all 0.15s",
            }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-light)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(10,20,40,0.5)"}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ position: "relative" }}>
                  <img src={f.avatar} alt="" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid var(--border-subtle)" }} />
                  <div style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "12px", height: "12px", borderRadius: "50%", background: statusColor(f.status), border: "2px solid var(--bg-darkest)" }} />
                </div>
                <div>
                  <div className="font-cinzel" style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{f.username}</div>
                  <div style={{ fontSize: "11px", color: statusColor(f.status) }}>{statusLabel(f.status)}</div>
                </div>
              </div>
              {f.status === "ONLINE" && (
                <button className="btn-press" style={{
                  padding: "5px 14px", background: "linear-gradient(180deg, var(--gold), var(--gold-dark))",
                  border: "none", borderRadius: "2px", color: "var(--bg-darkest)",
                  fontFamily: "'Cinzel', serif", fontSize: "9px", fontWeight: 700, letterSpacing: "1px", cursor: "pointer",
                }}>INVITE</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECURITY ─── */}
      <div id="profile-security" style={{ paddingTop: "80px", paddingBottom: "40px", scrollMarginTop: "var(--navbar-height)" }}>
        <h2 style={{ ...sectionTitleStyle, fontSize: "22px", marginBottom: "24px" }}>Security & 2FA</h2>
        <div style={{ padding: "24px", background: "rgba(10,20,40,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "4px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="font-cinzel" style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>Two-Factor Authentication</div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Add an extra layer of security with Google Authenticator</div>
            </div>
            <button className="btn-press" style={{ padding: "8px 20px", background: "linear-gradient(180deg, var(--gold), var(--gold-dark))", border: "none", borderRadius: "2px", color: "var(--bg-darkest)", fontFamily: "'Cinzel', serif", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", cursor: "pointer" }}>ENABLE</button>
          </div>
        </div>
        <div style={{ padding: "24px", background: "rgba(10,20,40,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "4px", marginBottom: "12px" }}>
          <div className="font-cinzel" style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>Email Verification</div>
          <div style={{ fontSize: "13px", color: "#2ECC71" }}>✓ Verified</div>
        </div>
        <div style={{ padding: "24px", background: "rgba(10,20,40,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="font-cinzel" style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>Linked Accounts</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                <Icons.Google size={16} />
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Google — Connected</span>
              </div>
            </div>
            <button className="btn-press" style={{ padding: "8px 20px", background: "none", border: "1px solid var(--accent-red)", borderRadius: "2px", color: "var(--accent-red)", fontFamily: "'Cinzel', serif", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", cursor: "pointer" }}>UNLINK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
