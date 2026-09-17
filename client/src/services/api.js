// client/src/services/api.js

const API_BASE_URL =
  "https://adtrack-campaign-manager.onrender.com/api/campaigns";

export const fetchCampaignsApi = async () => {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return res.json();
};

export const createCampaignApi = async (campaignData) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campaignData),
  });
  if (!res.ok) throw new Error("Failed to create campaign");
  return res.json();
};

export const updateCampaignStatusApi = async (id, status) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update campaign");
  return res.json();
};

export const deleteCampaignApi = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete campaign");
  return res.json();
};
