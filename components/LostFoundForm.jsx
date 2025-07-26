"use client";

import { useState } from "react";
import styles from "@/styles/LostFoundForm.module.css";

export default function LostFoundForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    email: "",
    phone: "",
    location: "",
    type: "lost",
    reportedBy: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, category, location, type } = formData;

    if (!title || !description || !category || !location || !type) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");

    const payload = {
      ...formData,
      contact: {
        email: formData.email,
        phone: formData.phone,
      },
    };

    delete payload.email;
    delete payload.phone;

    onAdd(payload);

    setFormData({
      title: "",
      description: "",
      category: "",
      image: "",
      email: "",
      phone: "",
      location: "",
      type: "lost",
      reportedBy: "",
    });
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Report Lost/Found Item</h2>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.inputGroup}>
        <label className={styles.label}>Title*</label>
        <input
          className={styles.input}
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Description*</label>
        <textarea
          className={styles.textarea}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Category*</label>
        <input
          className={styles.input}
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Image URL</label>
        <input
          className={styles.input}
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Contact Email</label>
        <input
          className={styles.input}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Contact Phone</label>
        <input
          className={styles.input}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Location*</label>
        <input
          className={styles.input}
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Type*</label>
        <select
          className={styles.select}
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Reported By</label>
        <input
          className={styles.input}
          name="reportedBy"
          value={formData.reportedBy}
          onChange={handleChange}
        />
      </div>

      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}
