import { useEmployers, useAddEmployer } from "../../hooks/useEmployers";
import { FaEye, FaComment, FaPlus, FaSearch } from "react-icons/fa";
import AddEmployerModal from "../../modals/customer/AddEmployerModal";
import AddLoanModal from "../../modals/customer/AddLoanModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Groups() {
  const { employers, isPending, error } = useEmployers();
  const { addEmployer } = useAddEmployer();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  if (isPending) return <div style={styles.state}>Loading...</div>;
  if (error) return <div style={styles.state}>Error loading employers</div>;

  const filteredEmployers = employers.filter((e) => {
    const term = searchTerm.toLowerCase();
    return (
      e?.name?.toLowerCase().includes(term) ||
      e?.risk_tier?.toLowerCase().includes(term) ||
      e?.status?.toLowerCase().includes(term) ||
      e?.deduction_cycle?.toLowerCase().includes(term)
    );
  });
  const hasNoResults = filteredEmployers && filteredEmployers.length === 0;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>
          Groups <span style={styles.subTitle}>List</span>
        </h2>

        <div style={styles.breadcrumb}>Home &gt; Customer</div>
      </div>

      {/* TOOLBAR */}
      <div style={styles.toolbar}>
        <select style={styles.select}>
          <option>All Branches</option>
        </select>

        <button
          style={styles.addBtn}
          data-bs-toggle="modal"
          data-bs-target="#addEmployerModal"
        >
          <FaPlus /> ADD NEW
        </button>
      </div>

      {/* SEARCH ROW */}
      <div style={styles.searchRow}>
        <div style={styles.record}>
          <span style={styles.badgeCount}>
            {filteredEmployers?.length || 0}
          </span>
          Record Found
        </div>

        <div style={styles.searchBox}>
          <input
            placeholder="Search by name, deduction cycle, status or risk tier"
            style={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table
          style={styles.table}
          className="table table-striped table-responsive table-bordered"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Group Name</th>
              <th>Total Members</th>
              <th>Max Exposure</th>
              <th>Risk Tier</th>
              <th>Total Loans</th>

              <th>Branch</th>

              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {hasNoResults ? (
              <tr>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No Loan found
                </td>
              </tr>
            ) : (
              filteredEmployers?.map((e, index) => (
                <tr
                  key={e.id}
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.financial.total_members}</td>
                  <td>{e.max_exposure}</td>
                  <td>{e.risk_tier}</td>
                  <td>{e.financial.loan_total}</td>
                  <td>{e.branch || "--"}</td>
                  <td>
                    <span style={styles.status}>{e.status}</span>
                  </td>
                  <td>
                    <div style={styles.actions}>
                      <FaEye
                        style={{ color: "#3498db", cursor: "pointer" }}
                        onClick={() => navigate(`/dashboard/groups/${e.id}`)}
                      />
                      {/* <FaComment style={{ color: "#f39c12", cursor: "pointer" }} /> */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div style={styles.pagination}>
        <select>
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>

        <div style={styles.pageButtons}>
          <button>← Previous</button>
          <span>Page 1</span>
          <button>Next →</button>
        </div>
      </div>
      <AddEmployerModal addEmployer={addEmployer} />
    </div>
  );
}

export default Groups;

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    padding: "20px",
    background: "#f5f7fb",
    fontFamily: "Gill Sans, sans-seriff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  subTitle: {
    fontSize: "14px",
    color: "#888",
    marginLeft: "5px",
  },

  breadcrumb: {
    fontSize: "13px",
    color: "#666",
  },

  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },

  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  addBtn: {
    marginLeft: "auto",
    background: "#00b894",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  searchRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    alignItems: "center",
  },

  record: {
    fontStyle: "italic",
  },

  badgeCount: {
    background: "#2d3436",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "50%",
    marginRight: "8px",
  },

  searchBox: {
    display: "flex",
    gap: "8px",
  },

  input: {
    padding: "8px",
    width: "260px",
    border: "1px solid #ccc",
  },

  searchBtn: {
    background: "#0984e3",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },

  tableWrapper: {
    background: "#fff",
    overflowX: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1000px",
  },

  status: {
    background: "#ffeaa7",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  phone: {
    color: "#0984e3",
    fontWeight: "bold",
  },

  time: {
    fontSize: "11px",
    color: "#888",
  },

  pagination: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    alignItems: "center",
  },

  pageButtons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  state: {
    padding: "20px",
  },
};
