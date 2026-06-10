import React from "react";
import { useMembers } from "../hooks/useMembers";
import { useEmployers } from "../hooks/useEmployers";

function DashboardHome() {
  const { members } = useMembers();
  const { employers } = useEmployers();

  const BRAND_GREEN = "#009A44";
  const BRAND_RED = "#E4002B";
  const DARK = "#111827";

  const styles = {
    page: {
      background: "#f4f6fb",
      minHeight: "100vh",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
    },

    header: {
      marginBottom: "24px",
    },

    title: {
      fontSize: "24px",
      fontWeight: 700,
      margin: 0,
      color: DARK,
    },

    subtitle: {
      marginTop: "6px",
      color: "#6b7280",
    },

    kpiCard: (bgColor, color) => ({
      background: bgColor,
      borderRadius: "16px",
      padding: "18px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
      color: color,
      position: "relative",
      overflow: "hidden",
    }),

    kpiLabel: {
      fontSize: "13px",
      margin: 0,
      opacity: 0.9,
    },

    kpiValue: {
      fontSize: "30px",
      fontWeight: 700,
      marginTop: "10px",
    },

    sectionCard: {
      background: "#fff",
      borderRadius: "16px",
      padding: "18px",
      border: "1px solid #e6e8f0",
      boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    },
  };

  const stats = [
    {
      label: "Total Customers",
      value: members.length,
      bg: BRAND_GREEN,
      color: "#fff",
    },
    {
      label: "Employers / SACCOs",
      value: employers.length,
      bg: "#111827",
      color: "#fff",
    },
    {
      label: "Active Loans",
      value: 342,
      bg: "#ffffff",
      color: "#111827",
    },
    {
      label: "Pending Approvals",
      value: 28,
      bg: BRAND_RED,
      color: "#fff",
    },
  ];

  const activities = [
    { text: "John Doe applied for a loan", time: "2 mins ago" },
    { text: "Payment received from Jane Smith", time: "10 mins ago" },
    { text: "New customer registered", time: "25 mins ago" },
    { text: "Loan approved for Michael", time: "1 hour ago" },
  ];

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Dashboard Overview</h2>
        <p style={styles.subtitle}>CurePlus fintech system performance</p>
      </div>

      {/* KPI SECTION */}
      <div className="container-fluid">
        <div className="row g-3">
          {stats.map((s, i) => (
            <div className="col-md-3" key={i}>
              <div style={styles.kpiCard(s.bg, s.color)}>
                <p style={styles.kpiLabel}>{s.label}</p>

                <h3 style={styles.kpiValue}>{s.value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />

      {/* MAIN CONTENT */}
      <div className="container-fluid">
        <div className="row g-3">
          {/* LEFT */}
          <div className="col-md-8">
            <div style={styles.sectionCard}>
              <h5>Recent Activity</h5>

              {activities.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #f1f3f9",
                  }}
                >
                  <span>{a.text}</span>
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-4">
            <div style={{ ...styles.sectionCard, marginBottom: "12px" }}>
              <h6>System Status</h6>
              <span style={{ color: BRAND_GREEN, fontWeight: 600 }}>
                Operational
              </span>
            </div>

            <div style={{ ...styles.sectionCard, marginBottom: "12px" }}>
              <h6>Loan Health</h6>
              <p style={{ margin: 0, color: "#6b7280" }}>87% repayment rate</p>
            </div>

            <div style={styles.sectionCard}>
              <h6>Pending Tasks</h6>
              <span style={{ color: BRAND_RED, fontWeight: 600 }}>
                12 approvals
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
