import React from "react";
import { useState } from "react";

const FilterSidebar = ({ filters, setFilters }) => {
  const handleCheckbox = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <aside className="w-64 bg-white p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Filter</h2>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price</h3>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.price}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, price: e.target.value }))
          }
          className="w-full"
        />
        <p className="text-sm">Up to ₹{filters.price}</p>
      </div>

      {/* Product Type */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Product type</h3>
        {["Cloth Bags", "Clutches", "Candles", "Add-ons"].map((type) => (
          <label key={type} className="block text-sm">
            <input
              type="checkbox"
              checked={filters.type.includes(type)}
              onChange={() => handleCheckbox("type", type)}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>

      {/* Minimum Order */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Minimum Order</h3>
        {[1, 5, 10, 25].map((qty) => (
          <label key={qty} className="block text-sm">
            <input
              type="checkbox"
              checked={filters.minOrder.includes(qty)}
              onChange={() => handleCheckbox("minOrder", qty)}
              className="mr-2"
            />
            {qty}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
