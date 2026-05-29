import { useState } from "react";
import cureplusclearlogo from "../assets/cureplusclearlogo.png";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://your-api.com/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully. Please login.");
        window.location.href = "/login";
      } else {
        alert(data.detail || "Signup failed");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
    },

    box: {
      width: "360px",
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      textAlign: "center",
    },

    logo: {
      width: "70px",
      height: "70px",
      objectFit: "contain",
      marginBottom: "10px",
    },

    title: {
      margin: 0,
      color: "#2c3e50",
    },

    subtitle: {
      margin: "5px 0 15px",
      color: "gray",
      fontSize: "13px",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    input: {
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      outline: "none",
    },

    button: {
      padding: "12px",
      background: "#2c3e50",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },

    buttonDisabled: {
      background: "gray",
      cursor: "not-allowed",
    },

    footer: {
      marginTop: "15px",
      fontSize: "12px",
      color: "gray",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <img src={cureplusclearlogo} alt="Cureplus Logo" style={styles.logo} />

        <h2 style={styles.title}>Cureplus</h2>
        <p style={styles.subtitle}>Create Account</p>

        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
