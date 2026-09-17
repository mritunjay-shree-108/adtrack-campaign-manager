import React from "react";

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search campaigns by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="filter-select"
        value={selectedPlatform}
        onChange={(e) => onPlatformChange(e.target.value)}
      >
        <option value="All">All Platforms</option>
        <option value="Google Ads">Google Ads</option>
        <option value="Meta">Meta</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="YouTube">YouTube</option>
      </select>
    </div>
  );
}
