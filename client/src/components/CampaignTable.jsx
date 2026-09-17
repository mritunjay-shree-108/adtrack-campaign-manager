import React from "react";

export default function CampaignTable({
  campaigns,
  onToggleStatus,
  onDeleteCampaign,
}) {
  const getPlatformClass = (platform) => {
    switch (platform) {
      case "Google Ads":
        return "platform-google";
      case "Meta":
        return "platform-meta";
      case "LinkedIn":
        return "platform-linkedin";
      case "YouTube":
        return "platform-youtube";
      default:
        return "platform-meta";
    }
  };

  return (
    <div className="card table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Channel</th>
            <th>Budget</th>
            <th>CTR</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-state">
                No matching campaigns found. Launch one from the left panel!
              </td>
            </tr>
          ) : (
            campaigns.map((c) => {
              const ctr =
                c.impressions > 0
                  ? ((c.clicks / c.impressions) * 100).toFixed(1)
                  : "0.0";
              return (
                <tr key={c.id}>
                  <td className="campaign-name">{c.name}</td>
                  <td>
                    <span
                      className={`platform-tag ${getPlatformClass(c.platform)}`}
                    >
                      {c.platform}
                    </span>
                  </td>
                  <td style={{ color: "#34d399", fontWeight: "700" }}>
                    ${Number(c.budget).toLocaleString()}
                  </td>
                  <td style={{ fontWeight: "700", color: "#f1f5f9" }}>
                    {ctr}%
                  </td>
                  <td>
                    <button
                      onClick={() => onToggleStatus(c)}
                      className={`status-btn ${c.status === "Active" ? "status-active" : "status-paused"}`}
                    >
                      {c.status === "Active" ? "● Active" : "○ Paused"}
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() => onDeleteCampaign(c.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
