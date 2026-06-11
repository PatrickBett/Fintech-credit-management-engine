import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMembers, useReferees } from "../../../hooks/useMembers";
import { useTransactions } from "../../../hooks/useTransactions";
import { usePayments } from "../../../hooks/usePayments";
import { FaLock } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import EditMemberModal from "../../../modals/customer/EditMemberModal";
import AddRefereeModal from "../../../modals/customer/AddRefereeModal";
import ConfirmModal from "../../../modals/customer/ConfirmModal";
import EditStatusModal from "../../../modals/customer/EditStatusModal";
import AddLoanModal from "../../../modals/customer/AddLoanModal";
function CustomerDetails() {
  const { national_id } = useParams();
  const { members } = useMembers();
  const { referees } = useReferees();
  const { transactions } = useTransactions();
  const { payments } = usePayments();
  const [selectedMember, setSelectedMember] = useState(null);
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState("Bio Info");
  console.log("Referees", referees);
  if (!referees) return <div className="p-3">Loading...</div>;

  if (!members) return <div className="p-3">Loading...</div>;

  const customer = members.find(
    (m) => String(m.national_id) === String(national_id),
  );
  const customerReferees = useMemo(() => {
    return referees.filter((r) => String(r.customer) === String(customer?.uid));
  }, [referees, customer]);

  const customerLoans = transactions.filter(
    (t) => String(t.customer?.national_id) === String(national_id),
  );

  if (!customer) return <div className="p-3">Customer not found</div>;
  const customerPayments = payments.filter(
    (p) => String(p.customer_detail?.national_id) === String(national_id),
  );

  if (!customerPayments) return <div className="p-3">Payments not found</div>;

  const total_payments = customerPayments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0,
  );

  const tabs = [
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
  ];

  return (
    <div className="container-fluid py-3">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          {" "}
          {customer.first_name} {customer.last_name} Details'
        </h4>

        <nav className="text-muted small">
          Home <span className="mx-1">›</span> {customer.first_name}{" "}
          {customer.last_name}
        </nav>
      </div>
      {/* ================= TABS ================= */}
      <div className="card shadow-sm mb-3">
        <div className="card-body p-2">
          <ul className="nav nav-tabs border-0 flex-nowrap overflow-auto">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* ================= BODY ================= */}
      <div className="row g-3">
        {/* LEFT */}
        <div className="col-lg-8">
          {/* BIO INFO */}
          {activeTab === "Bio Info" && (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <strong>Primary Information</strong>
              </div>

              <div className="card-body p-0">
                <table className="table mb-0 table-bordered table-hover">
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
                      <th>Gender</th>
                      <td>{customer.gender || "-"}</td>
                    </tr>

                    <tr>
                      <th>DOB</th>
                      <td>{customer.dob || "-"}</td>
                    </tr>
                    <tr>
                      <th>Added By</th>
                      <td>{customer.added_by?.username || "-"}</td>
                    </tr>
                    <tr>
                      <th>Current LO</th>
                      <td>{customer.dob || "-"}</td>
                    </tr>
                    <tr>
                      <th>Current CO</th>
                      <td>{customer.dob || "-"}</td>
                    </tr>
                    <tr>
                      <th>Current Limit</th>
                      <td>{customer?.limit || "0"} Kes</td>
                    </tr>
                    <tr>
                      <th>Date Added</th>
                      <td>
                        <small>
                          {new Date(customer.created_at).toLocaleTimeString()}
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <th>Branch</th>
                      <td>{customer.dob || "-"}</td>
                    </tr>
                    <tr>
                      <th>Product</th>
                      <td>
                        {customer?.creditprofile_details?.product_details
                          ?.name || "-"}
                      </td>
                    </tr>
                    <tr>
                      <th>Total Loans</th>
                      <td>
                        {customer?.creditprofile_details?.total_loans || "0"}
                      </td>
                    </tr>
                    <tr>
                      <th>KRA Pin</th>
                      <td>{customer.customerkyc_details?.kra_pin || "-"}</td>
                    </tr>

                    <tr>
                      <th>Status</th>
                      <td>
                        {customer.status == "ACTIVE" ? (
                          <span className="badge bg-success">
                            {customer.status}
                          </span>
                        ) : (
                          <span className="badge bg-warning">
                            {customer.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CONTACT INFO */}
          {activeTab === "Contact Info" && (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <strong>Contact Information</strong>
              </div>

              <div className="card-body p-0">
                <table className="table mb-0 table-bordered table-hover">
                  <tbody>
                    <tr>
                      <th>Primary Mobile</th>
                      <td>{customer.primary_mobile}</td>
                    </tr>

                    <tr>
                      <th>Secondary Mobile</th>
                      <td>{customer.secondary_mobile || "-"}</td>
                    </tr>

                    <tr>
                      <th>Email</th>
                      <td>{customer.email || "-"}</td>
                    </tr>

                    <tr>
                      <th>Physical Address</th>
                      <td>{customer.physical_address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ACCOUNT INFO */}
          {activeTab === "Account Info" && (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <strong>Account Information</strong>
              </div>

              <div className="card-body">
                {/* ===== ACCOUNT SUMMARY ===== */}
                <div className="mb-3">
                  <p className="mb-1">
                    <strong>Account balance:</strong> {customer.account_balance}
                  </p>

                  <p className="mb-1">
                    <strong>Status:</strong> {customer.status}
                  </p>
                </div>

                {/* ===== PAYMENTS TABLE ===== */}
                <hr />

                <strong className="mb-2">Payments:</strong>

                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction Code</th>
                        <th>Amount</th>
                        <th>Payer Details</th>
                        <th>Loan</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {customerPayments?.length > 0 ? (
                        customerPayments.map((p) => (
                          <tr key={p.id}>
                            <td>{p.created_at || "-"}</td>
                            <td>{p.transaction_code || "-"}</td>
                            <td>{p.amount}</td>
                            <td>{p.payment_method_detail.name || "-"}</td>
                            <td>{p.loan_detail.code}</td>
                            <td>
                              <span className="badge bg-success">
                                {p.status_detail?.name || p.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted">
                            No payments found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="mb-3">
                    <p className="mb-1">
                      <strong>Total Payments:</strong> {total_payments} KES
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LOANS  */}
          {activeTab === "Statement" && (
            <div className="card shadow-sm mt-3">
              <div className="card-header bg-white">
                <strong>Loans ({customerLoans.length})</strong>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0 table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Principal</th>
                        <th>Balance</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {customerLoans?.length > 0 ? (
                        customerLoans.map((t) => (
                          <tr key={t.id}>
                            <td>{t.code}</td>
                            <td>{t.principal}</td>
                            <td>{t.balance}</td>
                            <td>
                              <span className="badge bg-info">
                                {t.stage?.name}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            No loans found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* REFEREES  */}
          {activeTab === "Referees" && (
            <div className="card shadow-sm mt-3">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <strong>Referees ({customerReferees.length})</strong>
                <button
                  className="btn btn-sm btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#addRefereeModal"
                  onClick={() => setSelectedMember(customer)}
                >
                  ➕ ADD NEW
                </button>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0 table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Mobile Phone</th>
                        <th>Address</th>
                        <th>Relationship</th>
                      </tr>
                    </thead>

                    <tbody>
                      {customerReferees?.length > 0 ? (
                        customerReferees.map((r) => (
                          <tr key={r.id}>
                            <td>{r.name}</td>
                            <td>{r.mobile_no}</td>
                            <td>{r.address}</td>
                            <td>
                              <span className="badge bg-info">
                                {r.relationship}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center text-muted py-4"
                          >
                            Referees Not Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* COLLATERAL  */}
          {activeTab === "Collateral" && (
            <div className="card shadow-sm mt-3">
              <div className="card-header bg-white">
                <strong>Loans ({customerLoans.length})</strong>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0 table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Principal</th>
                        <th>Balance</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {customerLoans.length > 0 ? (
                        customerLoans.map((t) => (
                          <tr key={t.id}>
                            <td>{t.code}</td>
                            <td>{t.principal}</td>
                            <td>{t.balance}</td>
                            <td>
                              <span className="badge bg-info">
                                {t.status?.name}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center text-muted py-4"
                          >
                            Loans Not Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* UPLOADS  */}
          {activeTab === "Uploads" && (
            <div className="card shadow-sm mt-3">
              <div className="card-header bg-white">
                <strong>Loans ({customerLoans.length})</strong>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0 table-bordered table-hover">
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
                            <span className="badge bg-info">
                              {t.status?.name}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* EVENTS  */}
          {activeTab === "Events" && (
            <div className="card shadow-sm mt-3">
              <div className="card-header bg-white">
                <strong>Loans ({customerLoans.length})</strong>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0 table-bordered table-hover">
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
                            <span className="badge bg-info">
                              {t.status?.name}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* INTERACTIONS  */}
          {activeTab === "Interactions" && (
            <div className="card shadow-sm mt-3">
              <div className="card-header bg-white">
                <strong>Loans ({customerLoans.length})</strong>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0 table-bordered table-hover">
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
                            <span className="badge bg-info">
                              {t.status?.name}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* MESSAGES  */}
          {activeTab === "Messages" && (
            <div className="card shadow-sm mt-3">
              <div className="card-header bg-white">
                <strong>Loans ({customerLoans.length})</strong>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0 table-bordered table-hover">
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
                            <span className="badge bg-info">
                              {t.status?.name}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT ACTION PANEL */}
        <div className="col-lg-4">
          <div className="card shadow-sm mb-2">
            <div className="card-body">
              <button
                className="btn btn-primary w-100 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#editMemberModal"
                onClick={() => setSelectedMember(customer)}
              >
                ✏️ Update Profile
              </button>

              {customer.status === "ACTIVE" && (
                <button
                  className="btn btn-success w-100 mb-2"
                  data-bs-toggle="modal"
                  data-bs-target="#addLoanModal"
                  onClick={()=>setSelectedMember(customer)}
                >
                  ➕ Give a Loan
                </button>
              )}

              <button className="btn btn-dark w-100 mb-2">
                ⚡ Update Limit
              </button>

              <button className="btn btn-warning w-100 mb-2">
                💬 Interactions
              </button>

              <button
                type="button"
                className={`d-flex align-items-center justify-content-center gap-2 border-0 px-3 py-1 w-100 mb-2 ${
                  customer.status === "ACTIVE"
                    ? "bg-success"
                    : customer.status === "LEAD"
                      ? "bg-warning"
                      : "bg-danger"
                }`}
                data-bs-toggle="modal"
                data-bs-target="#editStatusModal"
                onClick={() => {
                  setSelectedMember(customer);
                  setStatus(customer.status);
                }}
              >
                <span className="text-white fw-semibold">
                  {customer.status}
                </span>

                <FaPencilAlt size={12} color="white" />
              </button>

              {/* <select className="form-select mb-2">
                <option>ACTIVE</option>
                <option>LEAD</option>
                <option>BLOCKED</option>
              </select> */}

              <button
                className="btn w-100 mb-2"
                style={{ background: "purple", color: "white" }}
              >
                ➕ Add Customer Tag
              </button>

              <button className="btn btn-danger w-100">
                <FaLock /> Reset PIN
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditMemberModal member={selectedMember} />
      <AddRefereeModal customerId={selectedMember?.uid} />
      <EditStatusModal
        status={status}
        setStatus={setStatus}
        customerId={selectedMember?.uid}
      />
      <AddLoanModal selectedMember = {selectedMember} />
    </div>
  );
}

export default CustomerDetails;
