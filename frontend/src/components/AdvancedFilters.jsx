import { useState } from "react";

export default function AdvancedFilters({ filters, setFilters }) {
  const categories = ["All", "Men", "Women", "Kids"];
  const sizes = ["S", "M", "L", "XL", "30", "32", "34", "36"];

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "All",
      size: "",
      minPrice: "",
      maxPrice: "",
      page: 1,
      limit: 12,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded"
      />

      {/* Category */}
      <select
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="border p-2 rounded"
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* Size */}
      <select
        value={filters.size}
        onChange={(e) => handleChange("size", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Sizes</option>
        {sizes.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      {/* Min price */}
      <input
        type="number"
        value={filters.minPrice}
        onChange={(e) => handleChange("minPrice", e.target.value)}
        placeholder="Min Price"
        className="border p-2 rounded"
      />

      {/* Max price */}
      <input
        type="number"
        value={filters.maxPrice}
        onChange={(e) => handleChange("maxPrice", e.target.value)}
        placeholder="Max Price"
        className="border p-2 rounded"
      />

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded col-span-1 md:col-span-4 lg:col-span-5"
      >
        Clear Filters
      </button>
    </div>
  );
}
