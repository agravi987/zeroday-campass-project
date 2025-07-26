import styles from "@/styles/LostFoundCard.module.css";

export default function LostFoundCard({ item }) {
  return (
    <div className={styles.cardContainer}>
      {item.image && (
        <img src={item.image} alt={item.title} className={styles.cardImage} />
      )}

      <h3 className={styles.cardTitle}>{item.title}</h3>

      <p className={styles.cardDescription}>{item.description}</p>

      <div className={styles.cardInfo}>
        <span className={styles.cardCategory}>{item.category}</span>
        <span className={styles.cardLocation}>📍 {item.location}</span>
        <span className={styles.cardDate}>
          {new Date(item.date).toLocaleDateString()}
        </span>
      </div>

      <div className={styles.cardContact}>
        {item.contact?.email && (
          <a href={`mailto:${item.contact.email}`} className={styles.cardEmail}>
            {item.contact.email}
          </a>
        )}
        {item.contact?.phone && (
          <a href={`tel:${item.contact.phone}`} className={styles.cardPhone}>
            {item.contact.phone}
          </a>
        )}
      </div>

      <small className={styles.cardReporter}>
        Reported by: {item.reportedBy || "Anonymous"}
      </small>
    </div>
  );
}
