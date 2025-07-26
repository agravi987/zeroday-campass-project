"use client";

import { useState, useEffect } from "react";
import AnnouncementCard from "../../components/AnnouncementCard";

import styles from "@/styles/Announcements.module.css";
import { useSession } from "next-auth/react";

export default function AnnouncementsPage() {
  const { data: session } = useSession();
  const [announcements, setAnnouncements] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    try {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      console.log("Fetched announcements:", data); // Debug log
      if (res.ok) {
        setAnnouncements(data);
      } else {
        setAnnouncements([]);
        setError(data.error || "Failed to fetch announcements");
      }
    } catch (error) {
      console.error("Failed to fetch announcements", error);
      setError("Failed to fetch announcements");
    }
  }

  function handleAdd(newAnnouncement) {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  }

  const filteredAnnouncements = announcements.filter((a) => {
    return (
      (filterCategory ? a.category === filterCategory : true) &&
      (filterDate
        ? new Date(a.date).toDateString() ===
          new Date(filterDate).toDateString()
        : true)
    );
  });

  return (
    <div className={styles.container}>
      <h1>Campus Announcements Feed</h1>

      <div className={styles.filters}>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {[...new Set(announcements.map((a) => a.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          aria-label="Filter by date"
        />
        <button
          onClick={() => {
            setFilterCategory("");
            setFilterDate("");
          }}
        >
          Clear Filters
        </button>
      </div>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {filteredAnnouncements.length === 0 && !error && (
          <p>No announcements found.</p>
        )}
        {filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement._id}
            announcement={announcement}
          />
        ))}
      </div>
    </div>
  );
}
