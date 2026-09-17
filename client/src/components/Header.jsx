import React from "react";

export default function Header() {
  return (
    <header className="header-container">
      <div className="brand-wrapper">
        <div className="brand-icon">📊</div>
        <div>
          <h1 className="header-title">AdTrack Platform</h1>
          <p className="header-subtitle">
            Enterprise Digital Advertising & Attribution Analytics
          </p>
        </div>
      </div>
      <div className="badge">
        <span className="live-dot"></span>
        <span>React 18 • Node.js • Express REST API</span>
      </div>
    </header>
  );
}
