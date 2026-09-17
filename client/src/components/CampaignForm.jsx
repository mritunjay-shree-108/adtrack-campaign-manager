import React, { useState } from "react";

export default function CampaignForm({ onAddCampaign }) {
  const [formData, setFormData] = useState({
    name: "",
    platform: "Google Ads",
    budget: "",
    impressions: "",
    clicks: "",
    status: "Active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.budget) return;

    onAddCampaign(formData);
    setFormData({
      name: "",
      platform: "Google Ads",
      budget: "",
      impressions: "",
      clicks: "",
      status: "Active",
    });
  };

  return (
    <div className="card">
      <h2 className="card-title">🚀 Launch Campaign</h2>
      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-group">
          <label>Campaign Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Q4 Growth Sprint"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Target Channel</label>
          <select
            value={formData.platform}
            onChange={(e) =>
              setFormData({ ...formData, platform: e.target.value })
            }
          >
            <option>Google Ads</option>
            <option>Meta</option>
            <option>LinkedIn</option>
            <option>YouTube</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Budget ($) *</label>
            <input
              type="number"
              required
              placeholder="1200"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Estimated Clicks</label>
            <input
              type="number"
              placeholder="450"
              value={formData.clicks}
              onChange={(e) =>
                setFormData({ ...formData, clicks: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Target Impressions</label>
          <input
            type="number"
            placeholder="25000"
            value={formData.impressions}
            onChange={(e) =>
              setFormData({ ...formData, impressions: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn-primary">
          + Launch Campaign
        </button>
      </form>
    </div>
  );
}
