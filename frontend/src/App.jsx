import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import DashboardHome from "./pages/DashboardHome";
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

import AllReports from "./modules/reports/AllReports";
import Allocations from "./modules/reports/Allocations";
import Analytics from "./modules/reports/Analytics";
import Profile from "./modules/reports/Profile";

import IncomeStatement from "./modules/accounting/IncomeStatement";
import BalanceSheet from "./modules/accounting/BalanceSheet";
import DefaulterAgeing from "./modules/accounting/DefaulterAgeing";
import TrialBalance from "./modules/accounting/TrialBalance";
import Audit from "./modules/accounting/Audit";
import Expenses from "./modules/accounting/Expenses";


import CreditLimit from "./modules/custom/CreditLimit";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/dashboard" element={<DashboardLayout />}>

        <Route index element={<DashboardHome />} />

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

        <Route path="reports" element={<Reports />}>
          <Route path="all" element={<AllReports />} />
          <Route path="allocations" element={<Allocations />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="accounting" element={<Accounting />}>
          <Route path="income-statement" element={<IncomeStatement />} />
          <Route path="balance-sheet" element={<BalanceSheet />} />
          <Route path="defaulter-ageing" element={<DefaulterAgeing />} />
          <Route path="trial-balance" element={<TrialBalance />} />
          <Route path="audit" element={<Audit />} />
          <Route path="expenses" element={<Expenses />} />
        </Route>

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