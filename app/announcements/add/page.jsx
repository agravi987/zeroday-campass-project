"use client";

import React from "react";
import AnnouncementForm from "@/components/AnnouncementForm";
import { useSession } from "next-auth/react";

function AddAnnouncement() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please log in to continue.</p>;

  const userRole = session.user?.role;

  if (userRole !== "admin") {
    return (
      <div style={{ padding: "2rem", color: "#c0392b", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to add announcements.</p>
      </div>
    );
  }

  return <AnnouncementForm />;
}

export default AddAnnouncement;
