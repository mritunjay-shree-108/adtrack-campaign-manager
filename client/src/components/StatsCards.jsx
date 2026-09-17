import React from "react";

export default function StatsCards({ summary }) {
  if (!summary) return null;

  const stats = [
    {
      label: "TOTAL AD SPEND",
      value: `$${summary.totalBudget.toLocaleString()}`,
      icon: "💰",
      sub: "Allocated budget",
    },
    {
      label: "TOTAL CLICKS",
      value: summary.totalClicks.toLocaleString(),
      icon: "🖱️",
      sub: "User engagements",
    },
    {
      label: "IMPRESSIONS",
      value: summary.totalImpressions.toLocaleString(),
      icon: "👁️",
      sub: "Ad exposures",
    },
    {
      label: "AVG. CLICK-THROUGH RATE",
      value: `${summary.avgCTR}%`,
      icon: "🎯",
      sub: "Conversion efficiency",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-card">
          <div className="stat-header">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-icon">{stat.icon}</span>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-subtext">✦ {stat.sub}</div>
        </div>
      ))}
    </section>
  );
}
