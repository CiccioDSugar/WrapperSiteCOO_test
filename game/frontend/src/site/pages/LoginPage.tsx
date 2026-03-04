import { useState, useCallback } from 'react';
import { inputStyle } from '../styles/shared';
import * as Icons from '../components/Icons';
import * as authService from '../services/authService';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [show2fa, setShow2fa] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ username: "", email: "", password: "", totp: "" });

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        const { ok, data } = await authService.login(
          formData.username, formData.password, show2fa ? formData.totp : undefined
        );
        if (data.requires2fa) { setShow2fa(true); setLoading(false); return; }
        if (ok) { onLogin(); } else { setError(data.message || data.error || "Login failed"); }

      } else if (mode === "register") {
        const { ok, data } = await authService.register(formData.username, formData.email, formData.password);
        if (ok) { setMode("login"); setFormData({ username: "", email: "", password: "", totp: "" }); }
        else { setError(data.error || data.message || "Registration failed"); }

      } else if (mode === "forgot") {
        const ok = await authService.forgotPassword(formData.email);
        if (ok) setMode("login");
        else setError("Something went wrong. Try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  }, [mode, formData, show2fa, onLogin]);

  const switchMode = (m: typeof mode) => { setMode(m); setError(""); setShow2fa(false); };

  return (
    <div className="animate-fadeIn" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `radial-gradient(ellipse at center, rgba(200,170,110,0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 20% 80%, rgba(10,200,185,0.04) 0%, transparent 50%), var(--bg-darkest)`,
      position: "relative", overflow: "hidden",
    }}>
      {/* Star particles */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(1px 1px at 20% 30%, rgba(200,170,110,0.3), transparent),
          radial-gradient(1px 1px at 80% 70%, rgba(200,170,110,0.2), transparent),
          radial-gradient(1px 1px at 50% 50%, rgba(200,170,110,0.15), transparent)`,
        backgroundSize: "200px 200px, 300px 300px, 250px 250px",
      }} />

      {/* Orb container */}
      <div style={{
        width: "420px", minHeight: "480px", borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(10,20,40,0.95) 0%, rgba(1,10,19,0.98) 70%)",
        border: "1px solid var(--border-gold)", animation: "orbPulse 4s ease-in-out infinite",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "60px 50px", position: "relative",
      }}>
        <h1 className="font-cinzel" style={{
          fontSize: mode === "login" ? "22px" : "20px", fontWeight: 700,
          background: "linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-dark))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "4px", letterSpacing: "3px", textAlign: "center", textTransform: "uppercase",
        }}>
          {mode === "login" && "Clash of Olympus"}
          {mode === "register" && "Join the Arena"}
          {mode === "forgot" && "Reset Password"}
        </h1>
        <p className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "13px", letterSpacing: "2px", marginBottom: "28px", textTransform: "uppercase" }}>
          {mode === "login" && "Enter the Battlefield"}
          {mode === "register" && "Forge Your Legend"}
          {mode === "forgot" && "Recover Access"}
        </p>

        {error && (
          <div style={{
            width: "100%", padding: "8px 12px", marginBottom: "12px",
            background: "rgba(232,64,87,0.15)", border: "1px solid var(--accent-red)",
            borderRadius: "2px", color: "var(--accent-red)", fontSize: "13px", textAlign: "center",
          }}>{error}</div>
        )}

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
          {(mode === "login" || mode === "register") && (
            <input className="input-glow" type="text" placeholder="Username" value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} style={inputStyle} />
          )}
          {(mode === "register" || mode === "forgot") && (
            <input className="input-glow" type="email" placeholder="Email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
          )}
          {mode !== "forgot" && (
            <div style={{ position: "relative" }}>
              <input className="input-glow" type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ ...inputStyle, paddingRight: "44px" }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px", display: "flex" }}>
                {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
              </button>
            </div>
          )}
          {show2fa && mode === "login" && (
            <div className="animate-slideUp">
              <input className="input-glow" type="text" placeholder="2FA Code" value={formData.totp}
                onChange={(e) => setFormData({ ...formData, totp: e.target.value })}
                style={{ ...inputStyle, textAlign: "center", letterSpacing: "8px", fontSize: "20px" }} maxLength={6} />
            </div>
          )}

          {/* Submit */}
          <button className="btn-press" type="button" onClick={handleSubmit} disabled={loading} style={{
            width: "100%", padding: "12px",
            background: loading ? "var(--text-muted)" : "linear-gradient(180deg, var(--gold), var(--gold-dark))",
            border: "none", borderRadius: "2px", color: "var(--bg-darkest)",
            fontFamily: "'Cinzel', serif", fontSize: "13px", fontWeight: 700,
            letterSpacing: "2px", textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer", transition: "all 0.2s", marginTop: "4px",
          }}>
            {loading ? "..." : mode === "login" ? "Enter" : mode === "register" ? "Register" : "Send Reset Link"}
          </button>

          {/* Google OAuth */}
          {mode !== "forgot" && (
            <button type="button" className="btn-press" onClick={authService.redirectToGoogle} style={{
              width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border-gold)", borderRadius: "2px",
              color: "var(--text-secondary)", fontFamily: "'Cinzel', serif", fontSize: "11px",
              fontWeight: 600, letterSpacing: "1px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "all 0.2s",
            }}>
              <Icons.Google size={16} /> Continue with Google
            </button>
          )}
        </div>

        {/* Mode switch links */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          {mode === "login" && (
            <>
              <button onClick={() => switchMode("register")} style={{ background: "none", border: "none", color: "var(--accent-blue)", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>Create an account</button>
              <span style={{ color: "var(--text-muted)", margin: "0 8px" }}>·</span>
              <button onClick={() => switchMode("forgot")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>Forgot password?</button>
            </>
          )}
          {mode === "register" && (
            <button onClick={() => switchMode("login")} style={{ background: "none", border: "none", color: "var(--accent-blue)", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>Already have an account? Sign in</button>
          )}
          {mode === "forgot" && (
            <button onClick={() => switchMode("login")} style={{ background: "none", border: "none", color: "var(--accent-blue)", cursor: "pointer", fontFamily: "'Crimson Text', serif", fontSize: "14px" }}>Back to login</button>
          )}
        </div>
      </div>
    </div>
  );
}
