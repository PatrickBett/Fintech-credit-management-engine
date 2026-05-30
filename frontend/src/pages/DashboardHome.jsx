import React from "react";

function DashboardHome() {
  const stats = [
    { label: "Total Customers", value: "1,248", change: "+12%", color: "#1d4ed8" },
    { label: "Active Loans", value: "342", change: "+5%", color: "#16a34a" },
    { label: "Pending Approvals", value: "28", change: "-3%", color: "#f59e0b" },
    { label: "Total Revenue", value: "$54,230", change: "+18%", color: "#9333ea" },
  ];

  const activities = [
    { text: "John Doe applied for a loan", time: "2 mins ago" },
    { text: "Payment received from Jane Smith", time: "10 mins ago" },
    { text: "New customer registered", time: "25 mins ago" },
    { text: "Loan approved for Michael", time: "1 hour ago" },
  ];

  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Dashboard Overview</h2>
        <p style={{ color: "#6b7280", marginTop: "5px" }}>
          Welcome back — here is your system summary
        </p>
      </div>

      {/* STATS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {stats.map((item, index) => (
          <div key={index} style={cardStyle}>
            <p style={{ color: "#6b7280", margin: 0 }}>{item.label}</p>
            <h3 style={{ margin: "8px 0", fontSize: "24px" }}>{item.value}</h3>
            <span style={{ color: item.color, fontSize: "13px" }}>
              {item.change} this month
            </span>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>

        {/* ACTIVITY FEED */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "12px" }}>Recent Activity</h3>

          {activities.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <span style={{ fontSize: "14px" }}>{a.text}</span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                {a.time}
              </span>
            </div>
          ))}
        </div>

        {/* SUMMARY PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          <div style={cardStyle}>
            <h4>Loan Performance</h4>
            <p style={{ color: "#6b7280", fontSize: "13px" }}>
              87% repayment rate this month
            </p>
          </div>

          <div style={cardStyle}>
            <h4>System Health</h4>
            <p style={{ color: "#16a34a", fontSize: "13px" }}>
              All systems operational
            </p>
          </div>

          <div style={cardStyle}>
            <h4>Pending Tasks</h4>
            <p style={{ color: "#f59e0b", fontSize: "13px" }}>
              12 approvals waiting
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardHome;