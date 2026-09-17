# 🎯 AdTrack — Digital Campaign & Performance Analytics Manager

An end-to-end, full-stack digital advertising campaign management and analytics platform built with **React.js, Node.js, and Express.js**.

AdTrack empowers marketing and product teams to seamlessly track, filter, and analyze multi-channel digital ad campaigns across **Google Ads, Meta, LinkedIn, and YouTube** with real-time KPI metrics calculation.

---

## 🌟 Key Features

- 📊 **Real-Time KPI Dashboard**: Automatically calculates and displays aggregate performance metrics including **Total Ad Spend, Total Clicks, Total Impressions, and Average Click-Through Rate (CTR %)**.
- 🔄 **Full CRUD Operations**: Create, Read, Update (toggle status between _Active_ and _Paused_), and Delete advertising campaigns with persistent data storage.
- 🔍 **Dynamic Filtering & Search**: Instant client-side search by campaign name and multi-platform filtering without page reload.
- ⚡ **RESTful Architecture**: Clean modular backend built on Express.js with JSON data modeling, input validation, and centralized error-handling middleware.
- 📱 **Modern Responsive UI**: Clean, accessible, and fast user interface designed with modern CSS and reactive component state.

---

## 🛠️ Tech Stack

### **Frontend**

- **React.js (v18)** — Component-driven UI architecture & state management hooks (`useState`, `useEffect`)
- **Vite** — Lightning-fast frontend build tooling
- **CSS3** — Custom modern responsive layouts, focus states, and smooth transitions

### **Backend**

- **Node.js** — Asynchronous JavaScript runtime environment
- **Express.js** — Scalable REST API routing and middleware
- **CORS** — Cross-Origin Resource Sharing handling
- **FS (File System) Persistence** — Server-side persistent storage

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

adtrack-campaign-manager/
├── server/
│ ├── data.json # Persistent JSON storage for campaigns
│ ├── package.json # Express dependencies & scripts
│ └── server.js # REST API endpoints & business logic
├── client/
│ ├── src/
│ │ ├── App.jsx # Main React UI component & state logic
│ │ ├── index.css # Base styling and design tokens
│ │ └── main.jsx # React entry point
│ ├── index.html # Root HTML template
│ ├── package.json # React & Vite configuration
│ └── vite.config.js # Vite plugin setup
└── README.md

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

### 👨‍💻 Author

Mritunjay Shree

- GitHub: @mritunjay-shree-108
- LinkedIn: linkedin.com/in/mritunjay-shree
- LeetCode: leetcode.com/mritunjay-shree-108
