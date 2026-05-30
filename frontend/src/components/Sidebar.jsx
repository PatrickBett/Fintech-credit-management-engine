import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCircle,
  FaUsers,
  FaMoneyBill,
  FaBuilding,
  FaChartBar,
  FaFileAlt,
  FaUserShield,
  FaCogs,
  FaUserTie,
  FaCreditCard,
} from "react-icons/fa";

/* ------------------ reusable sub link ------------------ */
const SubLink = ({ to,
  label,
  setSidebarOpen }) => {
  return (
    <NavLink
      to={to}
      
      style={({ isActive }) => ({
        display: "block",
        padding: "7px 12px",
        marginLeft: "10px",
        marginBottom: "3px",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "13px",
        color: isActive ? "#ffffff" : "#94a3b8",
        background: isActive ? "#1d4ed8" : "transparent",
      })} 
      onClick={() => {
        if (window.innerWidth <= 768) {
          setSidebarOpen(false);
        }
      }}
    >
      {label}
    </NavLink>
  );
};

/* ------------------ bullet item ------------------ */
const BulletItem = ({ to,
  label,
  setSidebarOpen, }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <FaCircle style={{ fontSize: "6px", marginLeft: "18px", color: "#64748b" }} />
    <SubLink to={to} label={label} setSidebarOpen={setSidebarOpen} />
  </div>
);

export default function Sidebar({
  isMobile,
  sidebarOpen,
  setSidebarOpen,
})  {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const sectionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "9px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#cbd5e1",
    marginBottom: "4px",
    background: "#0f172a",
    border: "1px solid #1e293b",
    fontSize: "14px",
  };

  const linkStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    marginBottom: "6px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#cbd5e1",
    background: isActive ? "#1d4ed8" : "transparent",
    fontSize: "14px",
  });

  return (
    <div
  style={{
    width: "260px",
    height: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #1e293b",

    position: isMobile ? "fixed" : "relative",
    top: 0,
    left: 0,

    zIndex: 999,

    transform:
      isMobile && !sidebarOpen
        ? "translateX(-100%)"
        : "translateX(0)",

    transition: "transform 0.3s ease",
  }}
>
      {/* ================= LOGO ================= */}
      <div
  style={{
    marginBottom: "34px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <img
    src="/src/assets/cureplusclearlogo.png"
    alt="logo"
    style={{
      width: "40px",
      height: "40px",
      objectFit: "contain",
    }}
  />

  <span
    style={{
      color: "white",
      fontSize: "30px",
      fontWeight: "600",
      letterSpacing: "0.5px",
    }}
  >
    Cureplus
  </span>
</div>

      <nav style={{ flex: 1 }}>

        {/* ================= CUSTOMERS ================= */}
        <div onClick={() => toggleSection("customers")} style={sectionStyle}>
          <span><FaUsers /> Customers</span>
          <span style={{ fontSize: "11px" }}>
            {openSection === "customers" ? "▼" : "▶"}
          </span>
        </div>

        {openSection === "customers" && (
          <>
            <BulletItem to="/dashboard/members/active" label="Active" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/members/leads" label="Leads" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/members/groups" label="Groups" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/members/scoring" label="Scoring" setSidebarOpen={setSidebarOpen} />
          </>
        )}

        {/* ================= CRM ================= */}
        <NavLink
          to="/dashboard/crm"
          style={({ isActive }) => linkStyle(isActive)}
        >
          <FaUserTie /> CRM
        </NavLink>

        

        {/* ================= LOANS ================= */}
        <div onClick={() => toggleSection("loans")} style={sectionStyle}>
          <span><FaMoneyBill /> Loans</span>
          <span style={{ fontSize: "11px" }}>
            {openSection === "loans" ? "▼" : "▶"}
          </span>
        </div>

        {openSection === "loans" && (
          <>
            <BulletItem to="/dashboard/loans/all" label="All Loans" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/loans/defaulters" label="Defaulters" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/loans/installments" label="Installments" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/loans/falling-due" label="Falling Due" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/loans/approvals" label="Approvals" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/loans/products" label="Loan Products" setSidebarOpen={setSidebarOpen} />
          </>
        )}

        {/* ================= ORGANIZATIONS ================= */}
        <div onClick={() => toggleSection("org")} style={sectionStyle}>
          <span><FaBuilding /> Organizations</span>
          <span style={{ fontSize: "11px" }}>
            {openSection === "org" ? "▼" : "▶"}
          </span>
        </div>

        {openSection === "org" && (
          <>
            <BulletItem to="/dashboard/org/staff" label="Staff" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/org/branches" label="Branches" setSidebarOpen={setSidebarOpen} />
          </>
        )}

        {/* ================= REPORTS ================= */}
        <div onClick={() => toggleSection("reports")} style={sectionStyle}>
          <span><FaChartBar /> Reports</span>
          <span style={{ fontSize: "11px" }}>
            {openSection === "reports" ? "▼" : "▶"}
          </span>
        </div>

        {openSection === "reports" && (
          <>
            <BulletItem to="/dashboard/reports/all" label="All Reports" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/reports/allocations" label="Allocations" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/reports/analytics" label="Analytics" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/reports/profile" label="Profile" setSidebarOpen={setSidebarOpen} />
          </>
        )}

        {/* ================= ACCOUNTING ================= */}
        <div onClick={() => toggleSection("accounting")} style={sectionStyle}>
          <span><FaFileAlt /> Accounting</span>
          <span style={{ fontSize: "11px" }}>
            {openSection === "accounting" ? "▼" : "▶"}
          </span>
        </div>

        {openSection === "accounting" && (
          <>
            <BulletItem to="/dashboard/accounting/income-statement" label="Income Statement" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/accounting/balance-sheet" label="Balance Sheet" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/accounting/defaulter-ageing" label="Defaulter Ageing" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/accounting/trial-balance" label="Trial Balance" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/accounting/audit" label="Audit" setSidebarOpen={setSidebarOpen} />
            <BulletItem to="/dashboard/accounting/expenses" label="Expenses" setSidebarOpen={setSidebarOpen} />
          </>
        )}

        {/* ================= PAYMENTS ================= */}
        <NavLink
          to="/dashboard/payments"
          style={({ isActive }) => linkStyle(isActive)}
        >
          <FaCreditCard /> Payments
        </NavLink>

        {/* ================= CUSTOM ================= */}
        <div onClick={() => toggleSection("custom")} style={sectionStyle}>
          <span><FaUserShield /> Custom</span>
          <span style={{ fontSize: "11px" }}>
            {openSection === "custom" ? "▼" : "▶"}
          </span>
        </div>

        {openSection === "custom" && (
          <>
            <BulletItem to="/dashboard/custom/credit-limits" label="Credit Limits" setSidebarOpen={setSidebarOpen} />
          </>
        )}

        {/* ================= SETTINGS ================= */}
        <NavLink
          to="/dashboard/settings"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 12px",
            marginTop: "6px",
            borderRadius: "8px",
            textDecoration: "none",
            color: isActive ? "#ffffff" : "#cbd5e1",
            background: isActive ? "#1d4ed8" : "transparent",
            fontSize: "14px",
          })}
        >
          <FaCogs /> Settings
        </NavLink>

      </nav>

      {/* ================= FOOTER ================= */}
      <div
        style={{
          fontSize: "11px",
          color: "#64748b",
          borderTop: "1px solid #1e293b",
          paddingTop: "10px",
        }}
      >
        v1.0.0 • CurePlus Admin
      </div>
    </div>
  );
}