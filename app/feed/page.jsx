// app/feed/page.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function FeedPage() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => setFeeds(data))
      .catch((err) => console.error("Feed fetch failed:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🔥 Tech News & Opportunities</h1>
      {feeds.length === 0 ? (
        <p>Loading feed...</p>
      ) : (
        <div className={styles.feedGrid}>
          {feeds.map((item, idx) => (
            <div key={idx} className={styles.feedCard}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noreferrer">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
