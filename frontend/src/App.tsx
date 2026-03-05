import { useState, useEffect } from 'react';
import './site/styles/site.css';

import LoginPage from './site/pages/LoginPage';
import DashboardPage from './site/pages/DashboardPage';
import LeaderboardPage from './site/pages/LeaderboardPage';
import ProfilePage from './site/pages/ProfilePage';
import GameFlow from './site/pages/GameFlow';
import Navbar from './site/components/Navbar';
import { checkAuth, logout } from './site/services/authService';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Check existing session on mount
  useEffect(() => {
    checkAuth().then((ok) => { if (ok) setIsLoggedIn(true); });
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  // Not authenticated → login
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => { setIsLoggedIn(true); setCurrentPage("dashboard"); }} />;
  }

  // In game → fullscreen, no navbar
  if (currentPage === "play") {
    return <GameFlow onExit={() => setCurrentPage("dashboard")} />;
  }

  // Site pages with navbar
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":    return <DashboardPage onNavigate={setCurrentPage} />;
      case "leaderboard":  return <LeaderboardPage />;
      case "profile":      return <ProfilePage />;
      default:             return <DashboardPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-darkest)" }}>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} notificationCount={3} />
      {renderPage()}
    </div>
  );
}

export default App;
