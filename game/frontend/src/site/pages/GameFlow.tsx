import { useState } from 'react';

// ============================================================================
// TODO: Decommentare quando integri i componenti di gioco reali:
//
// import { ModeSelectScene } from '../../UI/scenes/modeSelectScene';
// import { CharacterSelectScene } from '../../UI/scenes/characterSelectScene';
// import { QueueScene } from '../../UI/scenes/queueScene';
// import Game from '../../game/Game';
// import { socketService } from '../../services/socketServices';
// import { matchmakingSocket } from '../../services/matchmakingSocket';
// import { MatchMode, MatchType } from '../../types/game.types';
// ============================================================================

type GameScene = "mode-select" | "character-select" | "queue" | "game";

interface GameFlowProps {
  onExit: () => void;
}

/**
 * GameFlow — Fullscreen overlay che gestisce il flusso di gioco.
 * Sostituisce il vecchio App.tsx state machine (welcome → modeSelect → charSelect → queue → game).
 * 
 * Per integrare i componenti reali:
 * 1. Decommenta gli import sopra
 * 2. Sostituisci i placeholder JSX con i tuoi componenti
 * 3. Collega selectedMode/selectedCharacter allo state
 */
export default function GameFlow({ onExit }: GameFlowProps) {
  const [scene, setScene] = useState<GameScene>("mode-select");

  // TODO: decommentare per stato reale
  // const [selectedMode, setSelectedMode] = useState<MatchMode | null>(null);
  // const [selectedCharacterP1, setSelectedCharacterP1] = useState<'zeus' | 'ade'>('zeus');
  // const [selectedCharacterP2, setSelectedCharacterP2] = useState<'ade' | 'zeus'>('ade');

  const handleBack = () => {
    switch (scene) {
      case "mode-select": onExit(); break;
      case "character-select": setScene("mode-select"); break;
      case "queue":
        // TODO: matchmakingSocket.disconnect();
        setScene("character-select");
        break;
      case "game":
        // TODO: socketService.disconnect();
        onExit();
        break;
    }
  };

  const backBtn = (
    <button onClick={handleBack} className="btn-press" style={{
      position: "absolute", top: "24px", left: "24px", zIndex: 10,
      display: "flex", alignItems: "center", gap: "8px",
      padding: "10px 20px", background: "none",
      border: "1px solid var(--border-gold)", borderRadius: "2px",
      color: "var(--text-secondary)", fontFamily: "'Cinzel', serif",
      fontSize: "12px", fontWeight: 600, letterSpacing: "1px", cursor: "pointer",
    }}>← Back</button>
  );

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "var(--bg-darkest)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      {scene !== "game" && backBtn}

      {/* ─── MODE SELECT ─── */}
      {scene === "mode-select" && (
        <div className="animate-fadeIn" style={{ textAlign: "center" }}>
          <h1 className="font-cinzel" style={{
            fontSize: "36px", fontWeight: 800,
            background: "linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-dark))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "4px", marginBottom: "48px", textTransform: "uppercase",
          }}>Select Mode</h1>

          {/* TODO: <ModeSelectScene onSelectMode={(mode) => { setSelectedMode(mode); setScene("character-select"); }} /> */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "500px" }}>
            {[
              { label: "LOCAL", desc: "Same screen, 2 players" },
              { label: "VS AI", desc: "Fight the machine" },
              { label: "NORMAL", desc: "Casual online match" },
              { label: "RANKED", desc: "Competitive ELO" },
            ].map((m) => (
              <button key={m.label} className="btn-press" onClick={() => setScene("character-select")} style={{
                padding: "28px 24px", background: "rgba(10,20,40,0.6)",
                border: "1px solid var(--border-gold)", borderRadius: "4px",
                cursor: "pointer", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-gold)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div className="font-cinzel" style={{ color: "var(--gold)", fontSize: "16px", fontWeight: 700, letterSpacing: "2px", marginBottom: "6px" }}>{m.label}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── CHARACTER SELECT ─── */}
      {scene === "character-select" && (
        <div className="animate-fadeIn" style={{ textAlign: "center" }}>
          <h1 className="font-cinzel" style={{
            fontSize: "36px", fontWeight: 800,
            background: "linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-dark))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "4px", marginBottom: "48px", textTransform: "uppercase",
          }}>Choose Your Champion</h1>

          {/* TODO: <CharacterSelectScene mode={selectedMode} onConfirm={(p1, p2) => { ... }} /> */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", maxWidth: "600px" }}>
            {[
              { name: "ZEUS", emoji: "⚡", bg: "rgba(10,50,60,0.6)" },
              { name: "HADES", emoji: "🔥", bg: "rgba(60,20,20,0.3)" },
            ].map((c) => (
              <button key={c.name} className="btn-press" onClick={() => setScene("queue")} style={{
                padding: "48px 32px",
                background: `linear-gradient(135deg, ${c.bg}, rgba(10,20,40,0.8))`,
                border: "1px solid var(--border-gold)", borderRadius: "4px",
                cursor: "pointer", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-gold)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>{c.emoji}</div>
                <div className="font-cinzel" style={{ color: "var(--gold-light)", fontSize: "24px", fontWeight: 700, letterSpacing: "3px" }}>{c.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── QUEUE ─── */}
      {scene === "queue" && (
        <div className="animate-fadeIn" style={{ textAlign: "center" }}>
          {/* TODO: <QueueScene onMatchFound={() => setScene("game")} /> */}
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            border: "3px solid var(--border-gold)", borderTopColor: "var(--gold)",
            animation: "spin 1s linear infinite", margin: "0 auto 32px",
          }} />
          <h2 className="font-cinzel" style={{ color: "var(--gold)", fontSize: "24px", fontWeight: 700, letterSpacing: "3px", marginBottom: "12px" }}>
            SEARCHING FOR OPPONENT
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>This may take a moment...</p>
          <button className="btn-press" onClick={() => setScene("game")} style={{
            marginTop: "32px", padding: "12px 32px",
            background: "linear-gradient(180deg, var(--gold), var(--gold-dark))",
            border: "none", borderRadius: "2px", color: "var(--bg-darkest)",
            fontFamily: "'Cinzel', serif", fontSize: "12px", fontWeight: 700,
            letterSpacing: "2px", cursor: "pointer",
          }}>SIMULATE MATCH FOUND</button>
        </div>
      )}

      {/* ─── GAME ─── */}
      {scene === "game" && (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {/* TODO: Sostituisci con:
            <Game
              selectedCharacter={selectedCharacterP1}
              selectedMode={selectedMode!}
              p1Character={selectedCharacterP1}
              p2Character={selectedCharacterP2}
              onPlayAgain={() => setScene("mode-select")}
              onQuit={() => onExit()}
            />
          */}
          <h2 className="font-cinzel" style={{ color: "var(--gold)", fontSize: "28px", fontWeight: 700, letterSpacing: "4px", marginBottom: "16px" }}>
            GAME RUNNING
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>Your Three.js Canvas will render here</p>
          <div style={{ display: "flex", gap: "16px" }}>
            <button className="btn-press" onClick={() => setScene("mode-select")} style={{
              padding: "12px 32px", background: "none", border: "1px solid var(--border-gold)", borderRadius: "2px",
              color: "var(--gold)", fontFamily: "'Cinzel', serif", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", cursor: "pointer",
            }}>PLAY AGAIN</button>
            <button className="btn-press" onClick={onExit} style={{
              padding: "12px 32px", background: "none", border: "1px solid var(--text-muted)", borderRadius: "2px",
              color: "var(--text-muted)", fontFamily: "'Cinzel', serif", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", cursor: "pointer",
            }}>QUIT</button>
          </div>
        </div>
      )}
    </div>
  );
}
