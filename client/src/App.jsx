import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import StatsCards from "./components/StatsCards.jsx";
import CampaignForm from "./components/CampaignForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import CampaignTable from "./components/CampaignTable.jsx";
import {
  fetchCampaignsApi,
  createCampaignApi,
  updateCampaignStatusApi,
  deleteCampaignApi,
} from "./services/api.js";

export default function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [summary, setSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchCampaignsApi();
      setCampaigns(data.campaigns || []);
      setSummary(data.summary || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createCampaignApi(formData);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (campaign) => {
    const nextStatus = campaign.status === "Active" ? "Paused" : "Active";
    try {
      await updateCampaignStatusApi(campaign.id, nextStatus);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    try {
      await deleteCampaignApi(id);
      loadData();
    } catch (err) {
      console.error(err);
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
    <div className="app-container">
      <Header />
      <StatsCards summary={summary} />

      <main className="main-layout">
        <aside>
          <CampaignForm onAddCampaign={handleCreate} />
        </aside>
        <section>
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
          />
          <CampaignTable
            campaigns={filteredCampaigns}
            onToggleStatus={handleToggleStatus}
            onDeleteCampaign={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}
