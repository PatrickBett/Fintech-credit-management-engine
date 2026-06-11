import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEmployers } from "../../hooks/useEmployers";
import { useMembers } from "../../hooks/useMembers";
import {
  FaInfoCircle,
  FaUsers,
  FaMoneyBill,
  FaPiggyBank,
} from "react-icons/fa";

export default function GroupDetails() {
  const [activeTab, setActiveTab] = useState("details");
  const { id } = useParams();
  const { employers } = useEmployers();
  const { members } = useMembers();

  const group = employers.find((e) => String(e.id) === String(id));

  const groupMemberList = members.filter((m) => m.employer == id);

  return (
    <div
      className="container-fluid"
      style={{ background: "#f8f9fa", minHeight: "100vh", padding: "20px" }}
    >
      {/* HEADER */}
      <div
        className="mb-3 p-3 bg-white rounded shadow-sm"
        style={{ borderLeft: "4px solid #0d6efd" }}
      >
        <h3 className="mb-0 fw-semibold">
          Group Details{" "}
          <span className="text-muted fw-normal" style={{ fontSize: "14px" }}>
            / {group?.name}
          </span>
        </h3>
        <small className="text-muted">Home / Groups / Details</small>
      </div>

      {/* CARD */}
      <div className="card border-0 shadow-sm rounded-3">
        {/* TABS */}
        <div className="card-header bg-white p-0">
          <ul className="nav nav-tabs border-0">
            {[
              { key: "details", label: "Details", icon: <FaInfoCircle /> },
              { key: "customers", label: "Customers", icon: <FaUsers /> },
              { key: "loans", label: "Loans", icon: <FaMoneyBill /> },
              { key: "payments", label: "Payments", icon: <FaMoneyBill /> },
              { key: "savings", label: "Savings", icon: <FaPiggyBank /> },
            ].map((tab) => (
              <li className="nav-item" key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`nav-link ${
                    activeTab === tab.key ? "active fw-semibold" : ""
                  }`}
                  style={{
                    border: "none",
                    padding: "12px 16px",
                    fontSize: "14px",
                  }}
                >
                  {tab.icon} <span className="ms-2">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-body" style={{ background: "#fff" }}>
          {/* DETAILS */}
          {activeTab === "details" && (
            <div>
              <h5 className="mb-3 text-secondary">
                Customer Group Information
              </h5>

              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <tbody>
                    {[
                      ["UID", group?.id],
                      ["Group Name", group?.name],
                      ["Description", group?.description || "Not Indicated"],
                      ["Branch", group?.branch || "Not Indicated"],
                      ["Chairman", group?.chairman || "Not Indicated"],
                      ["Phone", group?.contact_phone],
                      ["Risk Tier", group?.risk_tier],
                      ["Max Exposure", `${group?.max_exposure} KES`],
                      ["Paybill/Till", group?.paybill || "-"],
                      ["Account", group?.account || "-"],
                      ["Total Members", group?.financial?.total_members],
                      ["Number of Loans", group?.financial?.number_of_loans],
                      [
                        "Loan Total",
                        `KES ${Number(
                          group?.financial?.loan_total || 0,
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}`,
                      ],
                      [
                        "Outstanding",
                        `KES ${Number(
                          group?.financial?.outstanding_amount || 0,
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}`,
                      ],
                      [
                        "Overdue",
                        `KES ${Number(
                          group?.financial?.overdue_amount || 0,
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}`,
                      ],
                      [
                        "Savings",
                        `KES ${Number(
                          group?.financial?.total_savings || 0,
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}`,
                      ],
                      ["Created At", group?.created_at],
                    ].map(([label, value], i) => (
                      <tr key={i}>
                        <th style={{ width: "30%", background: "#f8f9fa" }}>
                          {label}
                        </th>
                        <td>{value}</td>
                      </tr>
                    ))}

                    <tr>
                      <th style={{ width: "30%", background: "#f8f9fa" }}>
                        Status
                      </th>
                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            group?.status === "ACTIVE"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {group?.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CUSTOMERS */}
          {activeTab === "customers" && (
            <div>
              <h5 className="mb-3 text-secondary">Group Members</h5>

              <div className="table-responsive">
                <table className="table table-hover table-bordered align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>UID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>National ID</th>
                      <th>Limit</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {groupMemberList.length > 0 ? (
                      groupMemberList.map((member, index) => (
                        <tr key={member.uid || index}>
                          <td>{member.uid}</td>
                          <td>
                            {member.first_name} {member.last_name}
                          </td>
                          <td>{member.email}</td>
                          <td>{member.primary_mobile}</td>
                          <td>{member.national_id}</td>
                          <td>{member.limit}</td>
                          <td>
                            <span
                              className={`badge px-2 py-1 ${
                                member.status === "active"
                                  ? "bg-success"
                                  : "bg-secondary"
                              }`}
                            >
                              {member.status}
                            </span>
                          </td>
                          <td>
                            {new Date(member.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          No customers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PLACEHOLDERS */}
          {activeTab === "loans" && (
            <div className="p-5 text-center text-muted">
              Loan list goes here
            </div>
          )}

          {activeTab === "payments" && (
            <div className="p-5 text-center text-muted">Payments go here</div>
          )}

          {activeTab === "savings" && (
            <div className="p-5 text-center text-muted">
              Savings records go here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
