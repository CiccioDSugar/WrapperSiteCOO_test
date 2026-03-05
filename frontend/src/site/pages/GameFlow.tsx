import { useState, useEffect } from 'react';
import ModeSelectScene from '../../scenes/modeSelectScene';
import CharacterSelectScene from '../../scenes/characterSelectScene';
import QueueScene from '../../scenes/queueScene';
import Game from '../../game/Game';
import { socketService } from '../../services/socketServices';
import { matchmakingSocket } from '../../services/matchmakingSocket';
import { MatchMode } from '../../types/game.types';

type GameScene = 'mode-select' | 'character-select' | 'queue' | 'game';

interface GameFlowProps {
  onExit: () => void;
}

// TODO: quando Ale integra auth, passare il vero userId come prop
const TEMP_USER_DB_ID = 'w8r2b5za';

export default function GameFlow({ onExit }: GameFlowProps) {
  const [scene, setScene] = useState<GameScene>('mode-select');
  const [selectedMode, setSelectedMode] = useState<MatchMode>(MatchMode.RANKED);
  const [p1Character, setP1Character] = useState<'zeus' | 'ade'>('zeus');
  const [p2Character, setP2Character] = useState<'zeus' | 'ade'>('ade');

  // Connetti matchmaking socket quando entriamo nel flusso di gioco
  useEffect(() => {
    matchmakingSocket.connect();
    return () => {
      matchmakingSocket.disconnect();
    };
  }, []);

  // --- MODE SELECT ---
  const handleModeSelect = (mode: MatchMode) => {
    setSelectedMode(mode);
    setScene('character-select');
  };

  // --- CHARACTER SELECT ---
  // CharacterSelectScene emette join_* e chiama onConfirm
  // Per RANKED/UNRANKED → vai in queue ad aspettare match_found
  // Per LOCAL/AI → match_found arriva subito, gestito dentro queue
  const handleCharConfirm = (p1: 'zeus' | 'ade', p2: 'zeus' | 'ade') => {
    setP1Character(p1);
    setP2Character(p2);

    if (selectedMode === MatchMode.RANKED || selectedMode === MatchMode.UNRANKED) {
      setScene('queue');
    }
    // Per LOCAL/AI il match_found arriva dal socket — QueueScene lo cattura
    // Ma se vuoi saltare la queue per LOCAL/AI, puoi andare diretto:
    if (selectedMode === MatchMode.LOCAL || selectedMode === MatchMode.AI) {
      setScene('queue'); // QueueScene ascolta match_found e chiama onMatchFound
    }
  };

  // --- MATCH FOUND ---
  const handleMatchFound = () => {
    // Connetti al game socket di Giovanni
    socketService.connect('http://localhost', TEMP_USER_DB_ID);
    setScene('game');
  };

  // --- PLAY AGAIN / QUIT ---
  const handlePlayAgain = () => {
    socketService.disconnect();
    matchmakingSocket.connect();
    setScene('mode-select');
  };

  const handleQuit = () => {
    socketService.disconnect();
    matchmakingSocket.disconnect();
    onExit();
  };

  // --- BACK ---
  const handleBackFromCharSelect = () => {
    setScene('mode-select');
  };

  const handleCancelQueue = () => {
    matchmakingSocket.disconnect();
    matchmakingSocket.connect(); // riconnetti per prossima ricerca
    setScene('character-select');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
      {scene === 'mode-select' && (
        <ModeSelectScene
          onModeSelect={handleModeSelect}
          onBack={onExit}
        />
      )}

      {scene === 'character-select' && (
        <CharacterSelectScene
          mode={selectedMode}
          userDbId={TEMP_USER_DB_ID}
          onConfirm={handleCharConfirm}
          onBack={handleBackFromCharSelect}
        />
      )}

      {scene === 'queue' && (
        <QueueScene
          onMatchFound={handleMatchFound}
          onCancel={handleCancelQueue}
        />
      )}

      {scene === 'game' && (
        <Game
          selectedCharacter={p1Character}
          selectedMode={selectedMode}
          p1Character={p1Character}
          p2Character={p2Character}
          onPlayAgain={handlePlayAgain}
          onQuit={handleQuit}
          myUserId={TEMP_USER_DB_ID}
        />
      )}
    </div>
  );
}
