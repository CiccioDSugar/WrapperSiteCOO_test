import { sectionTitleStyle } from '../styles/shared';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="animate-fadeIn" style={{ paddingTop: "var(--navbar-height)" }}>
      {/* Hero */}
      <div id="section-game" style={{
        height: "calc(100vh - var(--navbar-height))",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        background: `radial-gradient(ellipse at center top, rgba(200,170,110,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 70%, rgba(10,200,185,0.04) 0%, transparent 40%), var(--bg-darkest)`,
        textAlign: "center", 
        scrollMarginTop: "var(--navbar-height)",
      }}>
        <h1 className="font-cinzel" style={{
          fontSize: "clamp(36px, 6vw, 72px)", 
          fontWeight: 900,
          background: "linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-dark))",
          WebkitBackgroundClip: "text", 
          WebkitTextFillColor: "transparent",
          letterSpacing: "6px", 
          lineHeight: 1.1, 
          marginBottom: "16px", 
          textTransform: "uppercase",
        }}>Clash of<br />Olympus</h1>
        <p className="font-cinzel" style={{ color: "var(--text-secondary)", fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "48px" }}>
          An Isometric Mythological Brawler
        </p>
        <button className="btn-press" onClick={() => onNavigate("play")} style={{
          padding: "18px 64px",
          background: "linear-gradient(180deg, var(--gold), var(--gold-dark))",
          border: "2px solid var(--gold-light)", borderRadius: "2px",
          color: "var(--bg-darkest)", fontFamily: "'Cinzel', serif", fontSize: "16px",
          fontWeight: 800, letterSpacing: "4px", textTransform: "uppercase", cursor: "pointer",
          transition: "all 0.3s",
          boxShadow: "0 0 30px var(--gold-glow), inset 0 1px 0 rgba(255,255,255,0.2)",
          animation: "float 3s ease-in-out infinite",
        }}>Play Now</button>
      </div>

      {/* Characters */}
      <div id="section-characters" style={{
        padding: "80px 48px",
        background: "linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-darkest) 100%)",
        borderTop: "1px solid var(--border-gold)", scrollMarginTop: "var(--navbar-height)",
      }}>
        <h2 style={sectionTitleStyle}>Choose Your Champion</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { name: "ZEUS", emoji: "⚡", desc: "God of Thunder. Commands lightning-based AoE attacks that strike all who dare approach.", bg: "rgba(10,50,60,0.6)" },
            { name: "HADES", emoji: "🔥", desc: "Lord of the Underworld. Wields fire-based AoE attacks that consume enemies in flames.", bg: "rgba(60,20,20,0.3)" },
          ].map((c) => (
            <div key={c.name} style={{
              background: `linear-gradient(135deg, ${c.bg}, rgba(10,20,40,0.8))`,
              border: "1px solid var(--border-gold)", borderRadius: "4px",
              padding: "40px 32px", textAlign: "center", transition: "all 0.3s", cursor: "pointer",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-gold)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>{c.emoji}</div>
              <h3 className="font-cinzel" style={{ color: "var(--gold-light)", fontSize: "22px", fontWeight: 700, letterSpacing: "3px", marginBottom: "12px" }}>{c.name}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div id="section-commands" style={{
        padding: "80px 48px", 
        borderTop: "1px solid var(--border-gold)",
        maxWidth: "700px",
        margin: "0 auto", 
        scrollMarginTop: "var(--navbar-height)",
      }}>
        <h2 style={sectionTitleStyle}>Controls</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { key: "W A S D", action: "Movement" },
            { key: "SPACE", action: "Attack (AoE Burst)" },
            { key: "SHIFT", action: "Defense Stance" },
            { key: "ESC", action: "Pause Menu" },
          ].map((c) => (
            <div key={c.key} style={{
              display: "flex", 
              alignItems: "center", 
              gap: "16px", 
              padding: "16px 20px",
              background: "rgba(10,20,40,0.5)", 
              border: "1px solid var(--border-subtle)", 
              borderRadius: "4px",
            }}>
              <kbd className="font-cinzel" style={{
                padding: "6px 12px", 
                background: "var(--bg-surface-light)",
                border: "1px solid var(--text-muted)",
                borderRadius: "3px",
                color: "var(--gold)", 
                fontSize: "12px", 
                fontWeight: 700, 
                letterSpacing: "1px", 
                whiteSpace: "nowrap",
              }}>{c.key}</kbd>
              <span style={{ 
                color: "var(--text-secondary)", 
                fontSize: "15px" 
              }}>{c.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: "24px 48px", 
        borderTop: "1px solid var(--border-subtle)",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
      }}>
        <span className="font-cinzel" style={{ 
          color: "var(--text-muted)", 
          fontSize: "11px", 
          letterSpacing: "1px"
        }}>CLASH OF OLYMPUS © 2026</span>
      </footer>
    </div>
  );
}
