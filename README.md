# 🎯 AdTrack — Digital Campaign & Performance Analytics Manager

An end-to-end, full-stack digital advertising campaign management and analytics platform built with **React.js, Node.js, and Express.js**.

AdTrack empowers marketing and product teams to seamlessly track, filter, and analyze multi-channel digital ad campaigns across **Google Ads, Meta, LinkedIn, and YouTube** with real-time KPI metrics calculation.

---

## 🔗 Live Deployments

- 🌐 **Frontend Web App (Vercel):** [https://adtrack-campaign-manager.vercel.app](https://adtrack-campaign-manager.vercel.app)
- ⚙️ **Backend REST API (Render):** [https://adtrack-campaign-manager.onrender.com/api/campaigns](https://adtrack-campaign-manager.onrender.com/api/campaigns)

---

## 🌟 Key Features

- 📊 **Real-Time KPI Dashboard**: Automatically calculates and displays aggregate performance metrics including **Total Ad Spend, Total Clicks, Total Impressions, and Average Click-Through Rate (CTR %)**.
- 🔄 **Full CRUD Operations**: Create, Read, Update (toggle status between _Active_ and _Paused_), and Delete advertising campaigns with persistent data storage.
- 🔍 **Dynamic Filtering & Search**: Instant client-side search by campaign name and multi-platform filtering without page reload.
- ⚡ **RESTful Architecture**: Modular backend built on Express.js with JSON data modeling, input validation, and centralized error-handling middleware.
- 🎨 **Modern Dark-Mode SaaS UI**: High-contrast, responsive card layouts, platform-specific badges, status pills, and fluid micro-interactions.
- 🧩 **Clean Modular Architecture**: Separation of concerns across UI components (`Header`, `StatsCards`, `CampaignForm`, `FilterBar`, `CampaignTable`) and centralized API services.

---

## 🛠️ Tech Stack

### **Frontend**

- **React.js (v18)** — Component-driven UI architecture & hooks (`useState`, `useEffect`)
- **Vite** — High-performance build tooling & development server
- **Modular CSS3** — Custom design tokens, dark glassmorphism, responsive grid layouts

### **Backend**

- **Node.js** — Asynchronous JavaScript runtime environment
- **Express.js** — REST API routing, aggregation algorithms, and middleware
- **CORS** — Configured for secure cross-origin communication with Vercel frontend
- **FS Persistence** — Server-side persistent file storage (`data.json`)

---

## 📡 REST API Documentation

| Method   | Endpoint             | Description                             | Request Body                                              | Response                               |
| :------- | :------------------- | :-------------------------------------- | :-------------------------------------------------------- | :------------------------------------- |
| `GET`    | `/api/campaigns`     | Fetch all campaigns + aggregate metrics | None                                                      | `{ summary: {...}, campaigns: [...] }` |
| `POST`   | `/api/campaigns`     | Create a new ad campaign                | `{ name, platform, budget, impressions, clicks, status }` | `201 Created (New Campaign Object)`    |
| `PUT`    | `/api/campaigns/:id` | Update campaign details or status       | `{ status, budget, ... }`                                 | `200 OK (Updated Object)`              |
| `DELETE` | `/api/campaigns/:id` | Remove a campaign                       | None                                                      | `{ message, id }`                      |

---

## 📁 Project Structure

```text
adtrack-campaign-manager/
├── server/
│   ├── data.json              # Persistent JSON storage for campaigns
│   ├── package.json           # Express dependencies & scripts
│   └── server.js              # REST API endpoints & aggregation logic
├── client/
│   ├── src/
│   │   ├── components/        # Modular UI components
│   │   │   ├── CampaignForm.jsx
│   │   │   ├── CampaignTable.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── StatsCards.jsx
│   │   ├── services/
│   │   │   └── api.js         # Centralized API network service layer
│   │   ├── App.jsx            # Main view orchestrator
│   │   ├── index.css          # Core design tokens and stylesheet
│   │   └── main.jsx           # React DOM root entry
│   ├── index.html             # HTML entry template
│   ├── package.json           # Frontend dependencies & scripts
│   └── vite.config.js         # Vite configuration
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` or `yarn`

### 1. Clone the Repository

```bash
git clone https://github.com/mritunjay-shree-108/adtrack-campaign-manager.git
cd adtrack-campaign-manager
```

### 2. Run the Backend Server

```bash
cd server
npm install
node server.js
```

Backend server will start at: http://localhost:5000

### 3. Run the Frontend Client

In a separate terminal tab:

```bash
cd client
npm install
npm run dev
```

Frontend application will start at: http://localhost:5173

## 👨‍💻 Author

**Mritunjay Shree**

- 🐙 **GitHub:** [@mritunjay-shree-108](https://github.com/mritunjay-shree-108)
- 💼 **LinkedIn:** [Mritunjay Shree](https://www.linkedin.com/in/mritunjay-shree)
- 🧠 **LeetCode:** [mritunjay-shree-108](https://leetcode.com/u/mritunjay-shree-108/)
- 📧 **Email:** [mritunjay.shree.1089@gmail.com](mailto:mritunjay.shree.1089@gmail.com)
