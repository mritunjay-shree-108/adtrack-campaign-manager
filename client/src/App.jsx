import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/campaigns";

export default function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [summary, setSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    platform: "Google Ads",
    budget: "",
    impressions: "",
    clicks: "",
    status: "Active",
  });

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setCampaigns(data.campaigns || []);
      setSummary(data.summary || null);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.budget) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({
          name: "",
          platform: "Google Ads",
          budget: "",
          impressions: "",
          clicks: "",
          status: "Active",
        });
        fetchCampaigns();
      }
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  const toggleStatus = async (campaign) => {
    const newStatus = campaign.status === "Active" ? "Paused" : "Active";
    try {
      await fetch(`${API_URL}/${campaign.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchCampaigns();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?"))
      return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchCampaigns();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPlatform =
      selectedPlatform === "All" || c.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px 20px",
        color: "#0f172a",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "800",
              margin: 0,
              color: "#0f172a",
            }}
          >
            🎯 AdTrack Campaign Manager
          </h1>
          <p
            style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "14px" }}
          >
            Full-Stack Digital Ad Campaign & Performance Analytics Platform
          </p>
        </div>
        <div
          style={{
            background: "#e0f2fe",
            color: "#0369a1",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          React + Node.js + Express
        </div>
      </div>

      {/* KPI Metric Cards */}
      {summary && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "18px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Total Ad Spend
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#059669",
                marginTop: "6px",
              }}
            >
              ${summary.totalBudget.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "18px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Total Clicks
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#2563eb",
                marginTop: "6px",
              }}
            >
              {summary.totalClicks.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "18px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Impressions
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#7c3aed",
                marginTop: "6px",
              }}
            >
              {summary.totalImpressions.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "18px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Avg. Click-Through Rate
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#d97706",
                marginTop: "6px",
              }}
            >
              {summary.avgCTR}%
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 1fr) 2fr",
          gap: "24px",
        }}
      >
        {/* Form Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
            height: "fit-content",
          }}
        >
          <h2
            style={{
              fontSize: "17px",
              fontWeight: "700",
              margin: "0 0 16px 0",
            }}
          >
            Launch New Campaign
          </h2>
          <form
            onSubmit={handleCreate}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                Campaign Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Q4 Brand Growth"
                required
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                <option>Google Ads</option>
                <option>Meta</option>
                <option>LinkedIn</option>
                <option>YouTube</option>
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  Budget ($) *
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  placeholder="1000"
                  required
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  Clicks
                </label>
                <input
                  type="number"
                  value={formData.clicks}
                  onChange={(e) =>
                    setFormData({ ...formData, clicks: e.target.value })
                  }
                  placeholder="450"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                Impressions
              </label>
              <input
                type="number"
                value={formData.impressions}
                onChange={(e) =>
                  setFormData({ ...formData, impressions: e.target.value })
                }
                placeholder="15000"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "6px",
                background: "#2563eb",
                color: "#fff",
                padding: "11px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              + Create Campaign
            </button>
          </form>
        </div>

        {/* Campaign List */}
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: "9px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#fff",
              }}
            />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              style={{
                padding: "9px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <option value="All">All Platforms</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Meta">Meta</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  <th style={{ padding: "12px 16px" }}>Campaign</th>
                  <th style={{ padding: "12px 16px" }}>Platform</th>
                  <th style={{ padding: "12px 16px" }}>Budget</th>
                  <th style={{ padding: "12px 16px" }}>CTR</th>
                  <th style={{ padding: "12px 16px" }}>Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        padding: "30px",
                        textAlign: "center",
                        color: "#94a3b8",
                      }}
                    >
                      No campaigns found.
                    </td>
                  </tr>
                ) : (
                  filteredCampaigns.map((c) => {
                    const ctr =
                      c.impressions > 0
                        ? ((c.clicks / c.impressions) * 100).toFixed(1)
                        : "0.0";
                    return (
                      <tr
                        key={c.id}
                        style={{ borderBottom: "1px solid #f1f5f9" }}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: "700" }}>
                          {c.name}
                        </td>
                        <td style={{ padding: "14px 16px", color: "#475569" }}>
                          {c.platform}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            color: "#059669",
                            fontWeight: "700",
                          }}
                        >
                          ${c.budget}
                        </td>
                        <td style={{ padding: "14px 16px", fontWeight: "600" }}>
                          {ctr}%
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <button
                            onClick={() => toggleStatus(c)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: "20px",
                              border: "none",
                              fontSize: "12px",
                              fontWeight: "700",
                              cursor: "pointer",
                              background:
                                c.status === "Active" ? "#dcfce7" : "#f1f5f9",
                              color:
                                c.status === "Active" ? "#15803d" : "#64748b",
                            }}
                          >
                            {c.status}
                          </button>
                        </td>
                        <td
                          style={{ padding: "14px 16px", textAlign: "right" }}
                        >
                          <button
                            onClick={() => handleDelete(c.id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#ef4444",
                              cursor: "pointer",
                              fontWeight: "700",
                            }}
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
        </div>
      </div>
    </div>
  );
}
