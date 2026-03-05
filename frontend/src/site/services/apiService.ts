import { fetchWithAuthRetry } from './authService';

export async function getMyProfile() {
  const res = await fetchWithAuthRetry('/api/users/me');
  if (!res || !res.ok) return null;
  return res.json();
}

export async function getMyStats() {
  const res = await fetchWithAuthRetry('/api/users/me/stats');
  if (!res || !res.ok) return null;
  return res.json();
}

export async function getMySettings() {
  const res = await fetchWithAuthRetry('/api/users/me/settings');
  if (!res || !res.ok) return null;
  return res.json();
}

export async function updateUsername(username: string) {
  const res = await fetchWithAuthRetry('/api/users/me/username', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });
  return res && res.ok;
}

export async function updateEmail(email: string) {
  const res = await fetchWithAuthRetry('/api/users/me/email', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res && res.ok;
}

export async function updateAvatar(avatarUrl: string | null) {
  const res = await fetchWithAuthRetry('/api/users/me/avatar', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ avatarUrl }),
  });
  return res && res.ok;
}

export async function getLeaderboard(page = 1, limit = 20) {
  const res = await fetchWithAuthRetry(`/api/users/leaderboard?page=${page}&limit=${limit}`);
  if (!res || !res.ok) return null;
  return res.json();
}

export async function getPublicProfile(userId: number) {
  const res = await fetchWithAuthRetry(`/api/users/${userId}`);
  if (!res || !res.ok) return null;
  return res.json();
}

export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const res = await fetchWithAuthRetry(`/api/users/check/username?username=${encodeURIComponent(username)}`);
  if (!res || !res.ok) return false;
  const data = await res.json();
  return !data.exists;
}

export async function checkEmailAvailable(email: string): Promise<boolean> {
  const res = await fetchWithAuthRetry(`/api/users/check/email?email=${encodeURIComponent(email)}`);
  if (!res || !res.ok) return false;
  const data = await res.json();
  return !data.exists;
}