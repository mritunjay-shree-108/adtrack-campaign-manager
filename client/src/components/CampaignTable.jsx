import React from "react";

export default function CampaignTable({
  campaigns,
  onToggleStatus,
  onDeleteCampaign,
}) {
  return (
    <div className="card table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Platform</th>
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
                No campaigns found.
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
                  <td className="font-semibold">{c.name}</td>
                  <td className="text-secondary">{c.platform}</td>
                  <td className="text-green font-semibold">
                    ${Number(c.budget).toLocaleString()}
                  </td>
                  <td>{ctr}%</td>
                  <td>
                    <button
                      onClick={() => onToggleStatus(c)}
                      className={`status-badge ${c.status === "Active" ? "badge-active" : "badge-paused"}`}
                    >
                      {c.status}
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
