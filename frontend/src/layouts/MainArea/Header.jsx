import { FaBars } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <FaBars
          onClick={toggleSidebar}
          style={{
            cursor: "pointer",
            fontSize: "18px",
          }}
        />

        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Dashboard
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          Admin
        </span>

        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#1d4ed8",
          }}
        />
      </div>
    </div>
  );
}