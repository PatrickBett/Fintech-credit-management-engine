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

import Active from "./modules/members/Active";
import Leads from "./modules/members/Leads";
import Groups from "./modules/members/Groups";
import Scoring from "./modules/members/Scoring";

import Staff from "./modules/organizations/Staff";
import Branches from "./modules/organizations/Branches";

import AllLoans from "./modules/loans/AllLoans";
import Defaulters from "./modules/loans/Defaulters";
import Installments from "./modules/loans/Installments";
import FallingDue from "./modules/loans/FallingDue";
import Approvals from "./modules/loans/Approvals";
import LoanProducts from "./modules/loans/LoanProducts";


import CreditLimit from "./modules/custom/CreditLimit";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/dashboard" element={<DashboardLayout />}>

        <Route path="members" element={<Members />} >
          <Route path="active" element={<Active />} />
          <Route path="leads" element={<Leads/>} />
          <Route path="groups" element={<Groups/>} />
          <Route path="scoring" element={<Scoring/>} />
        </Route>

        <Route path="crm" element={<Crm />} />
        <Route path="loans" element={<Loans />}>
          <Route path="all" element={<AllLoans />} />
          <Route path="defaulters" element={<Defaulters />} />
          <Route path="installments" element={<Installments />} />
          <Route path="falling-due" element={<FallingDue />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="products" element={<LoanProducts />} />
        </Route>
        <Route path="payments" element={<Payments />} />

        <Route path="org" element={<Organizations />} >
          <Route path="staff" element={<Staff />} />
          <Route path="branches" element={<Branches />} />
        </Route>

        <Route path="reports" element={<Reports />} />
        <Route path="accounting" element={<Accounting />} />

        <Route path="custom" element={<Custom />} >
          <Route path="credit-limits" element={<CreditLimit />} />
        </Route>

        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/" element={<Login />} />

    </Routes>
    </BrowserRouter>
  );
}