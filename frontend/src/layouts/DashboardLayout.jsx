import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "./MainArea/Header";


export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Left side */}
      <Sidebar />
       {/* Main section */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <Header />

      {/* Right side */}
      <div style={{
            flex: 1,
            backgroundColor: "#f8fafc",
            padding: "24px",
            overflowY: "auto",
          }}>
        <Outlet />
      </div>
      </div>

    </div>
  );
}