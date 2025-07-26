"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./dashboard.module.css";

const baseFeatures = [
  {
    title: "Announcements Feed",
    description: "View and filter announcements by category and date",
    path: "/announcements",
  },
  {
    title: "Lost & Found",
    description: "Report and search lost/found items with images and filters",
    path: "/lostfound",
  },
  {
    title: "Weekly Timetable",
    description: "Add, edit, delete classes shown in a grid view",
    path: "/timetable",
  },
  {
    title: "Hostel Complaints",
    description: "Submit complaints and track status updates",
    path: "/complaints",
  },
  {
    title: "Tech News And Opportunities",
    description: "Get the latest tech news, events, and hackathons",
    path: "/feed",
  },
  {
    title: "View Polls",
    description: "Participate in campus-wide polls",
    path: "/pollsandfeedback",
  },
];

const adminExtras = [
  {
    title: "Manage Users",
    description: "View and manage registered users",
    path: "/admin/users",
  },
  {
    title: "Post Announcements",
    description: "Create campus-wide announcements",
    path: "/announcements/add",
  },
  {
    title: "Post Tech Opportunities",
    description: "Share the latest tech news and hackathons",
    path: "/feed/add",
  },
  {
    title: "Make & View Polls",
    description: "Create polls and track responses",
    path: "/pollsandfeedback",
  },
];

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const isAdmin = userRole === "admin";

  const displayedFeatures = isAdmin
    ? [...baseFeatures, ...adminExtras]
    : baseFeatures;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        CampusLink - Centralized Student Utility Hub
      </h1>

      {isAdmin && (
        <p className={styles.adminNote}>
          You are logged in as an <strong>Admin</strong>. You have access to
          additional features.
        </p>
      )}

      <section className={styles.grid}>
        {displayedFeatures.map((feature) => (
          <div
            key={feature.title}
            className={styles.card}
            onClick={() => router.push(feature.path)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(feature.path);
              }
            }}
          >
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
