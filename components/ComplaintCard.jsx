import Link from "next/link";
import styles from "@/styles/ComplaintCard.module.css";

export default function ComplaintCard({ complaint, onStatusChange }) {
  const handleChange = (e) => {
    onStatusChange(complaint._id, e.target.value);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{complaint.title}</h3>

      <p className={styles.description}>
        {complaint.description.length > 100
          ? complaint.description.slice(0, 100) + "..."
          : complaint.description}
      </p>

      <div className={styles.actions}>
        <Link
          href={`/complaints/${complaint._id}`}
          className={styles.viewButton}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
