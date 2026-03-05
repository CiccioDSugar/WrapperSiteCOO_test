import { useState } from 'react';
import { navLinkBase } from '../styles/shared';
import { useDropdown, DropdownPanel, DropdownItem } from './Dropdown';
import * as Icons from './Icons';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  notificationCount?: number;
}

export default function Navbar({ currentPage, onNavigate, onLogout, notificationCount = 0 }: NavbarProps) {
  const dashboard = useDropdown();
  const profile = useDropdown();
  const notif = useDropdown();

  const navLink = (page: string): React.CSSProperties => ({
    ...navLinkBase,
    color: currentPage === page ? "var(--gold)" : "var(--text-secondary)",
    borderBottom: currentPage === page ? "2px solid var(--gold)" : "2px solid transparent",
  });

  const scrollTo = (page: string, sectionId: string) => {
    onNavigate(page);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // TODO: sostituire con notifiche reali da API di Renato
  const mockNotifications = [
    { id: 1, type: "FRIEND_REQ", title: "Friend Request", message: "Ares_42 sent you a friend request.", time: "2m ago", unread: true },
    { id: 2, type: "ACHV_UNLOCKED", title: "Achievement Unlocked!", message: 'You earned "First Blood"', time: "1h ago", unread: true },
    { id: 3, type: "FRIEND_ACCEPTED", title: "Friendship Accepted", message: "Athena accepted your request.", time: "3h ago", unread: true },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "var(--navbar-height)",
      background: "linear-gradient(180deg, #0A1428 0%, #091428F0 100%)",
      borderBottom: "1px solid var(--border-gold)",
      display: "flex", alignItems: "center", padding: "0 24px",
      zIndex: 999, backdropFilter: "blur(12px)",
    }}>
      {/* Logo */}
      <div onClick={() => onNavigate("dashboard")} style={{
        display: "flex", alignItems: "center", gap: "12px",
        marginRight: "32px", flexShrink: 0, cursor: "pointer",
      }}>
        <div style={{
          width: "40px", height: "40px",
          background: "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: "34px", height: "34px", background: "var(--bg-darkest)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)",
          }}>
            <Icons.Zap size={18} />
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", height: "100%", gap: "4px", flex: 1 }}>
        {/* Dashboard */}
        <div ref={dashboard.ref} style={{ position: "relative", height: "100%" }}>
          <div className="gold-shimmer" style={{ ...navLink("dashboard"), gap: "4px" }}
            onClick={() => { onNavigate("dashboard"); dashboard.setOpen(false); }}
            onMouseEnter={() => dashboard.setOpen(true)}>
            <Icons.Sword size={16} /> Dashboard <Icons.ChevronDown size={14} />
          </div>
          <div onMouseLeave={() => dashboard.setOpen(false)}>
            <DropdownPanel isOpen={dashboard.open}>
              <DropdownItem icon={Icons.Gamepad} label="Game" onClick={() => { scrollTo("dashboard", "section-game"); dashboard.setOpen(false); }} />
              <DropdownItem icon={Icons.Users} label="Characters" onClick={() => { scrollTo("dashboard", "section-characters"); dashboard.setOpen(false); }} />
              <DropdownItem icon={Icons.Settings} label="Commands" onClick={() => { scrollTo("dashboard", "section-commands"); dashboard.setOpen(false); }} />
            </DropdownPanel>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="gold-shimmer" style={navLink("leaderboard")} onClick={() => onNavigate("leaderboard")}>
          <Icons.Trophy size={16} /> Leaderboard
        </div>

        {/* Profile */}
        <div ref={profile.ref} style={{ position: "relative", height: "100%" }}>
          <div className="gold-shimmer" style={{ ...navLink("profile"), gap: "4px" }}
            onClick={() => { onNavigate("profile"); profile.setOpen(false); }}
            onMouseEnter={() => profile.setOpen(true)}>
            <Icons.User size={16} /> Profile <Icons.ChevronDown size={14} />
          </div>
          <div onMouseLeave={() => profile.setOpen(false)}>
            <DropdownPanel isOpen={profile.open}>
              <DropdownItem icon={Icons.Settings} label="Settings" onClick={() => { scrollTo("profile", "profile-settings"); profile.setOpen(false); }} />
              <DropdownItem icon={Icons.BarChart} label="Statistics" onClick={() => { scrollTo("profile", "profile-stats"); profile.setOpen(false); }} />
              <DropdownItem icon={Icons.Users} label="Friends" onClick={() => { scrollTo("profile", "profile-friends"); profile.setOpen(false); }} />
              <div style={{ height: "1px", background: "var(--border-gold)", margin: "4px 12px" }} />
              <DropdownItem icon={Icons.Shield} label="Security & 2FA" onClick={() => { scrollTo("profile", "profile-security"); profile.setOpen(false); }} />
            </DropdownPanel>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {/* Notifications */}
        <div ref={notif.ref} style={{ position: "relative" }}>
          <button onClick={() => notif.setOpen(!notif.open)} style={{
            background: "none", border: "1px solid transparent", borderRadius: "4px",
            padding: "8px", cursor: "pointer",
            color: notif.open ? "var(--gold)" : "var(--text-secondary)",
            transition: "all 0.2s", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icons.Bell size={20} />
            {notificationCount > 0 && (
              <span style={{
                position: "absolute", top: "2px", right: "2px",
                minWidth: "16px", height: "16px",
                background: "var(--accent-red)", borderRadius: "8px",
                fontSize: "10px", fontWeight: 700, fontFamily: "'Cinzel', serif",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 4px", animation: "badgePop 0.3s ease-out",
              }}>{notificationCount}</span>
            )}
          </button>

          <DropdownPanel isOpen={notif.open} right={0} minWidth="340px">
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 16px 12px", borderBottom: "1px solid var(--border-gold)",
            }}>
              <span className="font-cinzel" style={{ fontSize: "13px", fontWeight: 700, color: "var(--gold)", letterSpacing: "1px" }}>NOTIFICATIONS</span>
              <button style={{ background: "none", border: "none", color: "var(--accent-blue)", fontSize: "11px", fontFamily: "'Cinzel', serif", cursor: "pointer" }}>Mark all read</button>
            </div>
            <div style={{ overflowY: "auto", maxHeight: "320px" }}>
              {mockNotifications.map((n) => (
                <div key={n.id} style={{
                  padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)",
                  cursor: "pointer", transition: "background 0.15s",
                  background: n.unread ? "rgba(200,170,110,0.03)" : "transparent",
                }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-light)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = n.unread ? "rgba(200,170,110,0.03)" : "transparent"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span className="font-cinzel" style={{ fontSize: "12px", fontWeight: 600, color: "var(--gold-light)" }}>
                      {n.unread && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent-blue)", marginRight: 8 }} />}
                      {n.title}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.4 }}>{n.message}</p>
                  {n.type === "FRIEND_REQ" && (
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <button className="btn-press" style={{ padding: "4px 16px", background: "linear-gradient(180deg, var(--gold), var(--gold-dark))", border: "none", borderRadius: "2px", color: "var(--bg-darkest)", fontFamily: "'Cinzel', serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1px", cursor: "pointer" }}>ACCEPT</button>
                      <button className="btn-press" style={{ padding: "4px 16px", background: "none", border: "1px solid var(--text-muted)", borderRadius: "2px", color: "var(--text-secondary)", fontFamily: "'Cinzel', serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1px", cursor: "pointer" }}>DECLINE</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ padding: "10px", textAlign: "center", borderTop: "1px solid var(--border-gold)" }}>
              <button onClick={() => { onNavigate("notifications"); notif.setOpen(false); }}
                style={{ background: "none", border: "none", color: "var(--accent-blue)", fontFamily: "'Cinzel', serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", cursor: "pointer" }}>
                VIEW ALL NOTIFICATIONS
              </button>
            </div>
          </DropdownPanel>
        </div>

        {/* Logout */}
        <button onClick={onLogout} title="Logout" style={{
          background: "none", border: "1px solid transparent", borderRadius: "4px",
          padding: "8px", cursor: "pointer", color: "var(--text-secondary)",
          transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent-red)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
          <Icons.LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
