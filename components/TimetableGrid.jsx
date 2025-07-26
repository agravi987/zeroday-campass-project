"use client";

import styles from "@/styles/TimetableGrid.module.css";

export default function TimetableGrid({ entries, onEdit, days }) {
  // Group entries by day
  const grouped = {};
  days.forEach((day) => (grouped[day] = []));
  entries.forEach((entry) => {
    if (grouped[entry.day]) grouped[entry.day].push(entry);
  });

  return (
    <div className={styles.grid}>
      {days.map((day) => (
        <div key={day} className={styles.dayColumn}>
          <h2 className={styles.dayHeader}>{day}</h2>
          {grouped[day].map((entry) => (
            <div key={entry._id} className={styles.card}>
              <p>
                <strong>Time:</strong> {entry.time}
              </p>
              <p>
                <strong>Subject:</strong> {entry.subject}
              </p>
              <p>
                <strong>Location:</strong> {entry.location}
              </p>
              <button
                onClick={() => onEdit(entry)}
                className={styles.editButton}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
