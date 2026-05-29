import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaMoneyBill,
  FaBuilding,
  FaChartBar,
  FaCogs,
  FaFileAlt,
  FaCreditCard,
  FaUserShield,
} from "react-icons/fa";

export default function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 14px",
    marginBottom: "8px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#cbd5e1",
    background: isActive ? "#1d4ed8" : "transparent",
    fontWeight: isActive ? "600" : "400",
    transition: "0.2s",
  });

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #1e293b",
      }}
    >
      {/* Logo Section */}
      <div style={{ marginBottom: "10px" }}>
        <img
          src="/src/assets/cureplusclearlogo.png"
          alt="Cureplus Logo" style={{width: "60px",height: "60px"}}/>

      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        <NavLink to="/dashboard/members" style={linkStyle}>
          <FaUsers style={{ marginRight: "10px" }} />
           Customers
        </NavLink>
        <NavLink to="/dashboard/crm" style={linkStyle}>
          <FaChartBar style={{ marginRight: "10px" }} />
           CRM
        </NavLink>

        <NavLink to="/dashboard/loans" style={linkStyle}>
          <FaMoneyBill style={{ marginRight: "10px" }} />
           Loans
        </NavLink>
        <NavLink to="/dashboard/payments" style={linkStyle}>
          <FaCreditCard style={{ marginRight: "10px" }} />
           Payments
        </NavLink>
        <NavLink to="/dashboard/organizations" style={linkStyle}>
          <FaBuilding style={{ marginRight: "10px" }} />
           Organizations
        </NavLink>
        <NavLink to="/dashboard/reports" style={linkStyle}>
          <FaFileAlt style={{ marginRight: "10px" }} />
           Reports
        </NavLink>
        <NavLink to="/dashboard/accounting" style={linkStyle}>
          <FaCogs style={{ marginRight: "10px" }} />
           Accounting
        </NavLink>
        <NavLink to="/dashboard/custom" style={linkStyle}>
          <FaUserShield style={{ marginRight: "10px" }} />
           Custom
        </NavLink>

        <NavLink to="/dashboard/settings" style={linkStyle}>
          <FaCogs style={{ marginRight: "10px" }} />Settings
        </NavLink>

        
      </nav>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          fontSize: "12px",
          color: "#64748b",
          borderTop: "1px solid #1e293b",
          paddingTop: "12px",
        }}
      >
        v1.0.0 • Admin Panel
      </div>
    </div>
  );
}