"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/FeedList.module.css";

export default function FeedList() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then(setFeeds);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📢 Tech News & Opportunities</h2>
      {feeds.map((feed) => (
        <div key={feed._id} className={styles.card}>
          <h3>{feed.title}</h3>
          <p>{feed.description}</p>
          <p>
            <strong>Category:</strong> {feed.category}
          </p>
          <a href={feed.link} target="_blank" rel="noopener noreferrer">
            View Details
          </a>
        </div>
      ))}
    </div>
  );
}
