/**
 * Auth service — basato sui prototipi di Ale (authFetch.js, socketAuth.js)
 * Gestisce: login, register, logout, refresh, forgot/reset password, 2FA, OAuth
 */

export async function fetchWithAuthRetry(url: string, options: RequestInit = {}): Promise<Response | null> {
  let res = await fetch(url, { ...options, credentials: "include" });

  if (res.status === 401) {
    const refreshed = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshed.ok) {
      return null; // caller should redirect to login
    }
    res = await fetch(url, { ...options, credentials: "include" });
  }

  return res;
}

export async function login(username: string, password: string, totp?: string) {
  const payload: Record<string, string> = { username, password };
  if (totp) payload.totp = totp;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  return { ok: res.ok, data: await res.json() };
}

export async function register(username: string, email: string, password: string) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
  });

  return { ok: res.ok, data: await res.json() };
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
}

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch("/api/protected", { credentials: "include" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function forgotPassword(email: string) {
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return res.ok;
}

export function redirectToGoogle() {
  window.location.href = "/api/auth/google";
}