"use client";

import { useState, useEffect } from "react";
import ComplaintCard from "../../components/ComplaintCard";
import ComplaintForm from "../../components/ComplaintForm";
import styles from "@/styles/Complaints.module.css";
import { useRouter } from "next/navigation";

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchComplaints();
  }, [filterStatus]);

  async function fetchComplaints() {
    try {
      let url = "/api/complaints";
      if (filterStatus) url += `?status=${filterStatus}`;
      const res = await fetch(url);
      const data = await res.json();
      setComplaints(data);
    } catch (error) {
      console.error("Failed to fetch complaints", error);
    }
  }

  function handleAdd(newComplaint) {
    setComplaints((prev) => [newComplaint, ...prev]);
    setShowForm(false);
  }

  async function handleStatusChange(id, status) {
    try {
      const res = await fetch("/api/complaints", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Hostel Complaints</h1>

      {!showForm && (
        <button
          className={styles.newComplaintBtn}
          onClick={() => router.push("/addcomplaint")}
        >
          New Complaint
        </button>
      )}

      <div className={styles.filters}>
        <button
          onClick={() => setFilterStatus("")}
          className={`${styles.filterBtn} ${
            filterStatus === "" ? styles.activeFilter : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus("Pending")}
          className={`${styles.filterBtn} ${
            filterStatus === "Pending" ? styles.activeFilter : ""
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus("In Progress")}
          className={`${styles.filterBtn} ${
            filterStatus === "In Progress" ? styles.activeFilter : ""
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilterStatus("Resolved")}
          className={`${styles.filterBtn} ${
            filterStatus === "Resolved" ? styles.activeFilter : ""
          }`}
        >
          Resolved
        </button>
      </div>

      <div className={styles.complaintsList}>
        {complaints.length === 0 && <p>No complaints found.</p>}
        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint._id}
            complaint={complaint}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
