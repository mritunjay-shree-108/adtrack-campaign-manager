import React from "react";

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
}) {
  return (
    <div className="filter-bar">
      <div style={{ position: "relative", flex: 1 }}>
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search campaigns by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <select
        className="filter-select"
        value={selectedPlatform}
        onChange={(e) => onPlatformChange(e.target.value)}
      >
        <option value="All">All Channels (4)</option>
        <option value="Google Ads">Google Ads</option>
        <option value="Meta">Meta</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="YouTube">YouTube</option>
      </select>
    </div>
  );
}
