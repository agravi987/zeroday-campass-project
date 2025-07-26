"use client";

import { useState, useEffect } from "react";
import TimetableGrid from "../../components/TimetableGrid";
import TimetableForm from "../../components/TimetableForm";
import styles from "./page.module.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function TimetablePage() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch("/api/timetable");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    }
    fetchEntries();
  }, []);

  const handleAddClick = () => {
    setEditingEntry(null);
    setShowForm(true);
  };

  const handleSave = async (entry) => {
    try {
      const method = entry.id ? "PUT" : "POST";
      const url = entry.id ? `/api/timetable/${entry.id}` : "/api/timetable";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error("Failed to save entry");
      const savedEntry = await res.json();

      setEntries((prev) =>
        entry.id
          ? prev.map((e) => (e._id === savedEntry._id ? savedEntry : e))
          : [...prev, savedEntry]
      );
      setShowForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEntry(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weekly Schedule</h1>
      <p className={styles.subtitle}>
        Your complete class timetable for the week
      </p>

      {!showForm && (
        <button className={styles.addButton} onClick={handleAddClick}>
          Add Class
        </button>
      )}

      {showForm && (
        <TimetableForm
          initialData={editingEntry}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <TimetableGrid entries={entries} onEdit={handleEdit} days={days} />
    </div>
  );
}
