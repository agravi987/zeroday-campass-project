"use client";

import React from "react";
import axios from "axios";
import ComplaintForm from "@/components/ComplaintForm";
import styles from "./AddComplaint.module.css";

function AddComplaint() {
  const handleAddComplaint = async (formData) => {
    try {
      const response = await axios.post("/api/complaints/", formData);
      alert("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Complaint</h1>
      <ComplaintForm onAdd={handleAddComplaint} />
    </div>
  );
}

export default AddComplaint;
