"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/ComplaintDetail.module.css";

export default function ComplaintDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`/api/complaints/${id}`);
        setComplaint(res.data);
        setStatus(res.data.status);
      } catch (error) {
        console.error("Error fetching complaint:", error);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleStatusChange = async () => {
    try {
      const res = await axios.put(`/api/complaint/${id}`, { status });
      setComplaint(res.data);
      alert("Status updated!");
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this complaint?")) return;

    try {
      await axios.delete(`/api/complaint/${id}`);
      alert("Complaint deleted!");
      router.push("/complaints");
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  if (!complaint) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{complaint.title}</h1>
      <p className={styles.description}>{complaint.description}</p>

      <div className={styles.details}>
        <p>Priority: {complaint.priority}</p>
        <p>Category: {complaint.category}</p>
        <p>Hostel: {complaint.hostelBlock}</p>
        <p>Room: {complaint.room}</p>
        <p>Date: {new Date(complaint.date).toLocaleDateString()}</p>
        <p>Reported By: {complaint.reportedBy || "Anonymous"}</p>
      </div>

      <div className={styles.statusSection}>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button onClick={handleStatusChange} className={styles.updateBtn}>
          Update Status
        </button>
      </div>

      <button onClick={handleDelete} className={styles.deleteBtn}>
        Delete Complaint
      </button>
    </div>
  );
}
