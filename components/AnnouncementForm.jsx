"use client";

import { useState } from "react";
import styles from "@/styles/AnnouncementForm.module.css";

export default function AnnouncementForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      setError("All fields are required.");
      return;
    }
    setError("");
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });
      if (!res.ok) throw new Error("Failed to add announcement");
      const newAnnouncement = await res.json();
      onAdd(newAnnouncement);
      setTitle("");
      setContent("");
      setCategory("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Add Announcement</h2>
      {error && <p className={styles.error}>{error}</p>}

      <input
        className={styles.input}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className={styles.textarea}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className={styles.input}
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button className={styles.button} type="submit">
        Add
      </button>
    </form>
  );
}
