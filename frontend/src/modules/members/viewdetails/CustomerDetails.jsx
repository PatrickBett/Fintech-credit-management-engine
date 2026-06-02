import { useParams } from "react-router-dom";
import { useMembers } from "../../../hooks/useMembers";
import { useTransactions } from "../../../hooks/useTransactions";

function CustomerDetails() {
  const { national_id } = useParams();
  const { members } = useMembers();
  const { transactions } = useTransactions();

  if (!members) return <div className="p-3">Loading...</div>;

  const customer = members.find((m) => String(m.national_id) === String(national_id));

  const customerLoans = transactions.filter(
    (t) => String(t.customer?.national_id || t.customer?.id) === String(national_id),
  );

  if (!customer) return <div className="p-3">Customer not found</div>;

  return (
    <div className="container-fluid py-3">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Customer Details</h4>

        <nav className="text-muted small">
          Home <span className="mx-1">›</span> {customer.first_name}{" "}
          {customer.last_name}
        </nav>
      </div>

      {/* ================= TOP TABS ================= */}
      <div className="card shadow-sm mb-3">
        <div className="card-body p-2">
          <ul className="nav nav-tabs border-0">
            {[
              "Bio Info",
              "Contact Info",
              "Account Info",
              "Statement",
              "Referees",
              "Collateral",
              "Uploads",
              "Events",
              "Interactions",
              "Messages",
            ].map((tab) => (
              <li className="nav-item" key={tab}>
                <button className="nav-link">{tab}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="row g-3">
        {/* LEFT: PRIMARY INFO */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <strong>Primary Information</strong>
            </div>

            <div className="card-body p-0">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <th style={{ width: "30%" }}>UID</th>
                    <td>{customer.uid}</td>
                  </tr>

                  <tr>
                    <th>Full Name</th>
                    <td>
                      {customer.first_name} {customer.last_name}
                    </td>
                  </tr>

                  <tr>
                    <th>National ID</th>
                    <td>{customer.national_id}</td>
                  </tr>

                  <tr>
                    <th>Primary Mobile</th>
                    <td>{customer.primary_mobile}</td>
                  </tr>

                  <tr>
                    <th>Physical Address</th>
                    <td>{customer.physical_address}</td>
                  </tr>

                  <tr>
                    <th>Gender</th>
                    <td>{customer.gender || "-"}</td>
                  </tr>

                  <tr>
                    <th>DOB</th>
                    <td>{customer.dob || "-"}</td>
                  </tr>

                  <tr>
                    <th>Status</th>
                    <td>
                      <span className="badge bg-success">
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTION PANEL */}
        <div className="col-lg-4">
          <div className="card shadow-sm mb-2">
            <div className="card-body">
              <button className="btn btn-primary w-100 mb-2">
                ✏️ Update Profile
              </button>

              <button className="btn btn-success w-100 mb-2">
                ➕ Give a Loan
              </button>

              <button className="btn btn-dark w-100 mb-2">
                ⚡ Update Limit
              </button>

              <button className="btn btn-warning w-100 mb-2">
                💬 Interactions
              </button>

              <select className="form-select mb-2">
                <option>ACTIVE</option>
                <option>LEAD</option>
                <option>BLOCKED</option>
              </select>

              <button
                className="btn btn-purple w-100 mb-2"
                style={{ background: "purple", color: "white" }}
              >
                ➕ Add Customer Tag
              </button>

              <button className="btn btn-danger w-100">🔒 Reset PIN</button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LOANS SECTION ================= */}
      <div className="card shadow-sm mt-3">
        <div className="card-header bg-white">
          <strong>Loans ({customerLoans.length})</strong>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Principal</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {customerLoans.map((t) => (
                  <tr key={t.id}>
                    <td>{t.code}</td>
                    <td>{t.principal}</td>
                    <td>{t.balance}</td>
                    <td>
                      <span className="badge bg-info">{t.status?.name}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
