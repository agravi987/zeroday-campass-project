"use client";

import { useState, useEffect } from "react";
import LostFoundCard from "../../components/LostFoundCard";
import LostFoundForm from "../../components/LostFoundForm";
import styles from "./page.module.css";

export default function LostFoundPage() {
  const [items, setItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [type, setType] = useState("lost");

  useEffect(() => {
    fetchItems();
  }, [type]);

  async function fetchItems() {
    try {
      let url = `/api/lostfound?type=${type}`;
      if (filterCategory) url += `&category=${filterCategory}`;
      if (filterDate) url += `&date=${filterDate}`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch lost and found items", error);
    }
  }

  function handleAdd(newItem) {
    setItems((prev) => [newItem, ...prev]);
  }

  const filteredItems = items.filter((item) =>
    filterCategory ? item.category === filterCategory : true
  );

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Lost & Found Section</div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            type === "lost" ? styles.activeTab : ""
          }`}
          onClick={() => setType("lost")}
        >
          Lost Items
        </button>
        <button
          className={`${styles.tabButton} ${
            type === "found" ? styles.activeTab : ""
          }`}
          onClick={() => setType("found")}
        >
          Found Items
        </button>
      </div>

      <div className={styles.filters}>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">All Categories</option>
          {[...new Set(items.map((i) => i.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className={styles.dateInput}
        />

        <button
          onClick={() => {
            setFilterCategory("");
            setFilterDate("");
          }}
          className={styles.clearButton}
        >
          Clear Filters
        </button>
      </div>

      <div className={styles.results}>
        {filteredItems.length === 0 ? (
          <div className={styles.noItems}>No items found.</div>
        ) : (
          filteredItems.map((item) => (
            <LostFoundCard key={item._id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
