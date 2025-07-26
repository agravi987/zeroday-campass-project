"use client";

import { useState } from "react";
import styles from "@/styles/TimetableForm.module.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const times = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function TimetableForm({ onSave, onCancel, initialData }) {
  const [day, setDay] = useState(initialData?.day || "Monday");
  const [time, setTime] = useState(initialData?.time || "09:00 AM");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) {
      setError("Subject is required");
      return;
    }
    setError("");
    onSave({ day, time, subject, location, id: initialData?._id });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Class" : "Add Class"}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <label>
        Day
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
      <label>
        Time
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label>
        Subject*
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      <label>
        Location
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <div className={styles.buttons}>
        <button type="submit">{initialData ? "Update" : "Add"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
