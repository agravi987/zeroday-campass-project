import styles from "@/styles/AnnouncementCard.module.css";

export default function AnnouncementCard({ announcement }) {
  return (
    <div className={styles.card}>
      <h3>{announcement.title}</h3>
      <p>{announcement.content}</p>
      <small>
        Category: {announcement.category} | Date:{" "}
        {new Date(announcement.date).toLocaleDateString()}
      </small>
    </div>
  );
}
