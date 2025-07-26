"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/register", formData);
      setMessage("Registered successfully!");
      setFormData({ email: "", password: "", role: "student" });
      router.push("/login");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Register</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
