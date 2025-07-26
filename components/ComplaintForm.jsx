"use client";

import { useState } from "react";
import styles from "@/styles/ComplaintForm.module.css";

export default function ComplaintForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("");
  const [hostelBlock, setHostelBlock] = useState("");
  const [room, setRoom] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !hostelBlock || !room) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");

    const formData = {
      title,
      description,
      priority,
      category,
      hostelBlock,
      room,
      reportedBy,
    };

    onAdd(formData);

    setTitle("");
    setDescription("");
    setPriority("Low");
    setCategory("");
    setHostelBlock("");
    setRoom("");
    setReportedBy("");
  };

  return (
    <form className={styles.complaintForm} onSubmit={handleSubmit}>
      <h2 className={styles.formHeading}>Submit Complaint</h2>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Title*
          <input
            type="text"
            className={styles.formInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Description*
          <textarea
            className={styles.formTextarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Priority*
          <select
            className={styles.formSelect}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Category*
          <input
            type="text"
            className={styles.formInput}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Hostel Block*
          <input
            type="text"
            className={styles.formInput}
            value={hostelBlock}
            onChange={(e) => setHostelBlock(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Room*
          <input
            type="text"
            className={styles.formInput}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Reported By
          <input
            type="text"
            className={styles.formInput}
            value={reportedBy}
            onChange={(e) => setReportedBy(e.target.value)}
          />
        </label>
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
