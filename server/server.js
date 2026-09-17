import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper to read data
const readCampaigns = () => {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = [
      {
        id: "1",
        name: "Google Search Q3 Campaign",
        platform: "Google Ads",
        budget: 1500,
        impressions: 42000,
        clicks: 2150,
        status: "Active",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Meta Product Retargeting",
        platform: "Meta",
        budget: 950,
        impressions: 28000,
        clicks: 1340,
        status: "Active",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "LinkedIn B2B Lead Gen",
        platform: "LinkedIn",
        budget: 2200,
        impressions: 15000,
        clicks: 480,
        status: "Paused",
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(fileContent || "[]");
};

// Helper to write data
const writeCampaigns = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// 1. GET /api/campaigns - Get all campaigns + summary stats
app.get("/api/campaigns", (req, res) => {
  try {
    const campaigns = readCampaigns();

    // Aggregation logic (DeltaX product analytics)
    const totalBudget = campaigns.reduce(
      (acc, c) => acc + Number(c.budget || 0),
      0,
    );
    const totalClicks = campaigns.reduce(
      (acc, c) => acc + Number(c.clicks || 0),
      0,
    );
    const totalImpressions = campaigns.reduce(
      (acc, c) => acc + Number(c.impressions || 0),
      0,
    );
    const avgCTR =
      totalImpressions > 0
        ? ((totalClicks / totalImpressions) * 100).toFixed(2)
        : "0.00";
    const activeCount = campaigns.filter((c) => c.status === "Active").length;

    res.json({
      summary: {
        totalCampaigns: campaigns.length,
        activeCampaigns: activeCount,
        totalBudget,
        totalClicks,
        totalImpressions,
        avgCTR,
      },
      campaigns,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
});

// 2. POST /api/campaigns - Create a campaign
app.post("/api/campaigns", (req, res) => {
  try {
    const { name, platform, budget, impressions, clicks, status } = req.body;
    if (!name || !platform || budget === undefined) {
      return res
        .status(400)
        .json({ error: "Name, platform, and budget are required." });
    }

    const campaigns = readCampaigns();
    const newCampaign = {
      id: Date.now().toString(),
      name,
      platform,
      budget: Number(budget),
      impressions: Number(impressions || 0),
      clicks: Number(clicks || 0),
      status: status || "Active",
      createdAt: new Date().toISOString(),
    };

    campaigns.unshift(newCampaign);
    writeCampaigns(campaigns);
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: "Failed to create campaign" });
  }
});

// 3. PUT /api/campaigns/:id - Update campaign
app.put("/api/campaigns/:id", (req, res) => {
  try {
    const { id } = req.params;
    const campaigns = readCampaigns();
    const index = campaigns.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    campaigns[index] = {
      ...campaigns[index],
      ...req.body,
      budget:
        req.body.budget !== undefined
          ? Number(req.body.budget)
          : campaigns[index].budget,
      impressions:
        req.body.impressions !== undefined
          ? Number(req.body.impressions)
          : campaigns[index].impressions,
      clicks:
        req.body.clicks !== undefined
          ? Number(req.body.clicks)
          : campaigns[index].clicks,
    };

    writeCampaigns(campaigns);
    res.json(campaigns[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update campaign" });
  }
});

// 4. DELETE /api/campaigns/:id - Delete campaign
app.delete("/api/campaigns/:id", (req, res) => {
  try {
    const { id } = req.params;
    const campaigns = readCampaigns();
    const filtered = campaigns.filter((c) => c.id !== id);

    if (campaigns.length === filtered.length) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    writeCampaigns(filtered);
    res.json({ message: "Campaign deleted successfully", id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete campaign" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
