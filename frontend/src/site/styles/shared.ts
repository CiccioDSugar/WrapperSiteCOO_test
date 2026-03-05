import React from 'react';

export const navLinkBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 16px",
  textDecoration: "none",
  fontFamily: "'Cinzel', serif",
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "color 0.2s",
  height: "100%",
};

export const dropdownItemBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 16px",
  color: "var(--text-secondary)",
  fontFamily: "'Cinzel', serif",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.5px",
  cursor: "pointer",
  transition: "all 0.15s",
  border: "none",
  background: "none",
  width: "100%",
  textAlign: "left",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(10, 20, 40, 0.8)",
  border: "1px solid var(--border-gold)",
  borderRadius: "2px",
  color: "var(--text-primary)",
  fontFamily: "'Crimson Text', serif",
  fontSize: "16px",
  transition: "all 0.2s",
};

export const sectionTitleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: "var(--gold)",
  letterSpacing: "4px",
  textTransform: "uppercase",
  marginBottom: "48px",
  textAlign: "center",
  fontFamily: "'Cinzel', serif",
};
