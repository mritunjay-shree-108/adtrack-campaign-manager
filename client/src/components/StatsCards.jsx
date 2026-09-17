import React from "react";

export default function StatsCards({ summary }) {
  if (!summary) return null;

  const stats = [
    {
      label: "TOTAL AD SPEND",
      value: `$${summary.totalBudget.toLocaleString()}`,
      colorClass: "text-green",
    },
    {
      label: "TOTAL CLICKS",
      value: summary.totalClicks.toLocaleString(),
      colorClass: "text-blue",
    },
    {
      label: "IMPRESSIONS",
      value: summary.totalImpressions.toLocaleString(),
      colorClass: "text-purple",
    },
    {
      label: "AVG. CTR",
      value: `${summary.avgCTR}%`,
      colorClass: "text-amber",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-card">
          <span className="stat-label">{stat.label}</span>
          <span className={`stat-value ${stat.colorClass}`}>{stat.value}</span>
        </div>
      ))}
    </section>
  );
}
