"use client";

import React from "react";
import axios from "axios";
import LostFoundForm from "@/components/LostFoundForm";

function AllLostItem() {
  const handleAddItem = async (formData) => {
    try {
      const response = await axios.post("/api/lostfound", formData);

      alert("Item submitted successfully!");
    } catch (error) {
      console.error("Error submitting item:", error);
      alert("Failed to submit item. Please try again.");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Report Lost or Found Item</h1>
      <LostFoundForm onAdd={handleAddItem} />
    </div>
  );
}

export default AllLostItem;
