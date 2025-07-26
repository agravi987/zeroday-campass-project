// Hero.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import "@/styles/Hero.css";
import Loader from "./Loader";

export default function Hero() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  if (status === "loading") {
    return <Loader content={"Loading your dashboard..."} />;
  }

  return (
    <section className="hero">
      {session ? (
        <p className="hero-welcome">
          Welcome,{" "}
          {session.user?.name ||
            userRole.charAt(0).toUpperCase() + userRole.slice(1)}{" "}
          👋
        </p>
      ) : (
        <></>
      )}
      {/* <img src="/campus.jpg" alt="Campus Image" className="hero-image" /> */}
      <h1 className="hero-title">Sri Eshwar Campus Portal</h1>
      <p className="hero-subtitle">
        Empowering Students. Enabling Faculty. Elevating Education.
      </p>

      {session ? (
        <div className="hero-actions">
          <button
            className="hero-btn"
            onClick={() => router.push("/dashboard")}
          >
            🏫 Go to Dashboard
          </button>
          <button
            className="hero-btn"
            onClick={() => router.push("/timetable")}
          >
            📅 View Timetable
          </button>
          <button
            className="hero-btn"
            onClick={() => router.push("/lost-and-found")}
          >
            🧳 Lost & Found
          </button>
        </div>
      ) : (
        <div className="hero-actions">
          <button className="hero-btn" onClick={() => router.push("/login")}>
            🔐 Login to Access
          </button>
        </div>
      )}
    </section>
  );
}
