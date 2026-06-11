import React from "react";
import { useMembers } from "../hooks/useMembers";
import { useEmployers } from "../hooks/useEmployers";

function DashboardHome() {
  const { members } = useMembers();
  const { employers } = useEmployers();

  const BRAND_GREEN = "#009A44";
  const BRAND_RED = "#E4002B";
  const DARK = "#111827";

  // -----------------------
  // DUMMY FINTECH METRICS
  // -----------------------
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
      label: "Total Loans",
      value: 128,
      bg: "#2563eb",
      color: "#fff",
    },
    {
      label: "Active Loans",
      value: 87,
      bg: "#10b981",
      color: "#fff",
    },
    {
      label: "Pending Approvals",
      value: 14,
      bg: BRAND_RED,
      color: "#fff",
    },
    {
      label: "Overdue Loans",
      value: 9,
      bg: "#dc2626",
      color: "#fff",
    },
    {
      label: "Total Disbursed",
      value: "KES 5,420,000",
      bg: "#f59e0b",
      color: "#111827",
    },
    {
      label: "Outstanding Balance",
      value: "KES 1,280,500",
      bg: "#7c3aed",
      color: "#fff",
    },
  ];

  const activities = [
    { text: "Loan approved for John Doe", time: "2 mins ago" },
    { text: "KES 12,000 repayment received", time: "10 mins ago" },
    { text: "New customer registered", time: "25 mins ago" },
    { text: "Loan moved to disbursement stage", time: "1 hour ago" },
  ];

  const styles = {
    page: {
      background: "#f4f6fb",
      minHeight: "100vh",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
    },

    header: {
      marginBottom: "20px",
    },

    title: {
      fontSize: "26px",
      fontWeight: 700,
      margin: 0,
      color: DARK,
    },

    subtitle: {
      marginTop: "6px",
      color: "#6b7280",
    },

    kpiCard: (bg, color) => ({
      background: bg,
      borderRadius: "16px",
      padding: "18px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
      color,
      height: "100%",
    }),

    kpiLabel: {
      fontSize: "13px",
      opacity: 0.9,
      margin: 0,
    },

    kpiValue: {
      fontSize: "28px",
      fontWeight: 700,
      marginTop: "10px",
    },

    sectionCard: {
      background: "#fff",
      borderRadius: "16px",
      padding: "18px",
      border: "1px solid #e6e8f0",
      boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    },

    sectionTitle: {
      fontSize: "16px",
      fontWeight: 600,
      marginBottom: "12px",
    },
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>CurePlus Dashboard</h2>
        <p style={styles.subtitle}>
          Loan portfolio overview and system performance
        </p>
      </div>

      {/* KPI GRID */}
      <div className="container-fluid">
        <div className="row g-3">
          {stats.map((s, i) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
              <div style={styles.kpiCard(s.bg, s.color)}>
                <p style={styles.kpiLabel}>{s.label}</p>
                <div style={styles.kpiValue}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />

      {/* MAIN SECTION */}
      <div className="container-fluid">
        <div className="row g-3">
          {/* LEFT: ACTIVITY */}
          <div className="col-md-8">
            <div style={styles.sectionCard}>
              <div style={styles.sectionTitle}>Recent Activity</div>

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

          {/* RIGHT: SYSTEM INFO */}
          <div className="col-md-4">
            <div style={{ ...styles.sectionCard, marginBottom: "12px" }}>
              <div style={styles.sectionTitle}>System Status</div>
              <span style={{ color: BRAND_GREEN, fontWeight: 600 }}>
                All Systems Operational
              </span>
            </div>

            <div style={{ ...styles.sectionCard, marginBottom: "12px" }}>
              <div style={styles.sectionTitle}>Loan Health</div>
              <p style={{ margin: 0, color: "#6b7280" }}>
                87% repayment performance
              </p>
            </div>

            <div style={styles.sectionCard}>
              <div style={styles.sectionTitle}>Pending Tasks</div>
              <span style={{ color: BRAND_RED, fontWeight: 600 }}>
                12 approvals waiting
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
