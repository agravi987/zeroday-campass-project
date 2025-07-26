"use client";
import { useState } from "react";
import styles from "@/styles/Form.module.css";

export default function FeedForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/feed", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Feed added");
    setForm({ title: "", description: "", link: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add New Feed</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="Link"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option>Hackathon</option>
        <option>Internship</option>
        <option>Tech News</option>
      </select>
      <button type="submit">Add Feed</button>
    </form>
  );
}
