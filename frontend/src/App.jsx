import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Members from "./pages/Members";
import Loans from "./pages/Loans";
import Login from "./pages/Loginpage";
import Crm from "./pages/Crm";
import Accounting from "./pages/Accounting";
import Custom from "./pages/Custom";
import Payments from "./pages/Payments";
import Organizations from "./pages/Organizations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="members" element={<Members />} />
        <Route path="crm" element={<Crm />} />
        <Route path="loans" element={<Loans />} />
        <Route path="payments" element={<Payments />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="reports" element={<Reports />} />
        <Route path="accounting" element={<Accounting />} />
        <Route path="custom" element={<Custom />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/" element={<Login />} />

    </Routes>
    </BrowserRouter>
  );
}