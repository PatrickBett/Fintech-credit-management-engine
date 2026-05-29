import { useState } from "react";
import cureplusclearlogo from "../assets/cureplusclearlogo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        alert(data.detail || "Invalid credentials");
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
      fetchPriority: "high",
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
        <p style={styles.subtitle}>System Login</p>

        <form onSubmit={handleLogin} style={styles.form}>
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

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={styles.footer}>© {new Date().getFullYear()} Cureplus</div>
      </div>
    </div>
  );
}
