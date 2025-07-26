"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "@/styles/Navbar.css";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const userRole = session?.user?.role;

  return (
    <nav className="navbar">
      {/* College Branding */}
      <div className="navbar-logo" onClick={() => router.push("/")}>
        Sri Eshwar College
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link href="/"> Home</Link>
        {/* <Link href="/contacts"> Contact</Link> */}

        {session ? (
          <>
            <Link href="/dashboard"> Dashboard</Link>
            <Link href="/announcements"> Announcements</Link>
            <Link href="/complaints"> Complaints</Link>
            <Link href="/lostfound">Lost & Found Items</Link>

            {/* ✅ Profile Section */}
            <div className="navbar-profile">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="profile"
                  className="profile-image"
                />
              )}
              <span className="profile-name">
                {session.user?.name ||
                  userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
              <button className="btn btn-logout" onClick={() => signOut()}>
                🚪 Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link className="btn btn-login" href="/login">
              🔐 Login
            </Link>
            <Link className="btn btn-register" href="/register">
              📝 Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
