import { useState } from 'react';
import { inputStyle } from '../styles/shared';
import * as Icons from '../components/Icons';

// TODO: sostituire con fetch da API di Renato
const MOCK_LEADERBOARD = [
  { rank: 1, username: "OlympianGod", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=OlympianGod", elo: 2150, wins: 342, losses: 89 },
  { rank: 2, username: "ThunderStrike", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=ThunderStrike", elo: 2080, wins: 298, losses: 102 },
  { rank: 3, username: "HadesWrath", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=HadesWrath", elo: 1990, wins: 267, losses: 113 },
  { rank: 4, username: "ZeusLightning", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=ZeusLightning", elo: 1920, wins: 245, losses: 130 },
  { rank: 5, username: "AresBlood", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=AresBlood", elo: 1870, wins: 230, losses: 141 },
  { rank: 6, username: "AthenaWise", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=AthenaWise", elo: 1810, wins: 210, losses: 155 },
  { rank: 7, username: "PoseidonWave", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=PoseidonWave", elo: 1780, wins: 198, losses: 162 },
  { rank: 8, username: "HermesSpeed", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=HermesSpeed", elo: 1750, wins: 189, losses: 170 },
];

const rankColor = (r: number) => r === 1 ? "#FFD700" : r === 2 ? "#C0C0C0" : r === 3 ? "#CD7F32" : "var(--text-secondary)";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_LEADERBOARD.filter((p) => p.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fadeIn" style={{ paddingTop: "calc(var(--navbar-height) + 40px)", maxWidth: "800px", margin: "0 auto", padding: "calc(var(--navbar-height) + 40px) 24px 40px" }}>
      <h1 className="font-cinzel" style={{ fontSize: "32px", fontWeight: 700, color: "var(--gold)", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "32px" }}>Leaderboard</h1>

      <div style={{ position: "relative", marginBottom: "24px" }}>
        <input className="input-glow" type="text" placeholder="Search players..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, paddingLeft: "44px", background: "rgba(10,20,40,0.6)", borderRadius: "4px", width: "100%" }} />
        <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}><Icons.Search size={18} /></div>
      </div>

      <div style={{ border: "1px solid var(--border-gold)", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 100px 80px 80px", padding: "12px 20px", background: "rgba(200,170,110,0.06)", borderBottom: "1px solid var(--border-gold)" }}>
          {["RANK", "PLAYER", "ELO", "WINS", "LOSSES"].map((h) => (
            <span key={h} className="font-cinzel" style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "1.5px" }}>{h}</span>
          ))}
        </div>
        {filtered.map((p) => (
          <div key={p.rank} style={{
            display: "grid", gridTemplateColumns: "60px 1fr 100px 80px 80px",
            padding: "14px 20px", alignItems: "center",
            borderBottom: "1px solid var(--border-subtle)", cursor: "pointer", transition: "background 0.15s",
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(200,170,110,0.04)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}>
            <span className="font-cinzel" style={{ fontWeight: 800, fontSize: "16px", color: rankColor(p.rank) }}>{p.rank}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={p.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${rankColor(p.rank)}` }} />
              <span className="font-cinzel" style={{ fontWeight: 600, fontSize: "14px", color: "var(--text-primary)" }}>{p.username}</span>
            </div>
            <span className="font-cinzel" style={{ fontWeight: 700, fontSize: "15px", color: "var(--gold)" }}>{p.elo}</span>
            <span style={{ color: "var(--accent-blue)", fontSize: "14px" }}>{p.wins}</span>
            <span style={{ color: "var(--accent-red)", fontSize: "14px" }}>{p.losses}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
