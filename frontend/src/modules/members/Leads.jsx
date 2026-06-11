import { useMembers } from "../../hooks/useMembers";
import { useAddMember } from "../../hooks/useMembers";
import { FaEye, FaComment, FaPlus, FaSearch } from "react-icons/fa";
import AddCustomerModal from "../../modals/customer/AddCustomerModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Leads() {
  const navigate = useNavigate();
  const { members, isPending, error } = useMembers();
  const { addMember } = useAddMember();
  const [searchTerm, setSearchTerm] = useState("");
  const leadMembers = members.filter(
    (m) => m.status === "LEAD" || m.status === "BLOCKED",
  );
  const filteredLeadMembers = leadMembers.filter((m) => {
    const term = searchTerm.toLowerCase();
    return (
      m?.first_name?.toLowerCase().includes(term) ||
      m?.last_name?.toLowerCase().includes(term) ||
      m?.national_id?.toLowerCase().includes(term) ||
      m?.primary_mobile?.toLowerCase().includes(term)
    );
  });
  const hasNoResults = filteredLeadMembers && filteredLeadMembers.length === 0;

  if (isPending) return <div style={styles.state}>Loading...</div>;
  if (error) return <div style={styles.state}>Error loading leads</div>;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>
          Leads <span style={styles.subTitle}>List</span>
        </h2>

        <div style={styles.breadcrumb}>Home &gt; Customer</div>
      </div>

      {/* TOOLBAR */}
      <div style={styles.toolbar}>
        <select style={styles.select}>
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>

        <select style={styles.select}>
          <option>All Branches</option>
        </select>

        <select style={styles.select}>
          <option>All Types</option>
        </select>

        <select style={styles.select}>
          <option>All Agents</option>
        </select>

        <button
          style={styles.addBtn}
          data-bs-toggle="modal"
          data-bs-target="#addMemberModal"
        >
          <FaPlus /> ADD NEW
        </button>
      </div>

      {/* SEARCH ROW */}
      <div style={styles.searchRow}>
        <div style={styles.record}>
          <span style={styles.badgeCount}>
            {filteredLeadMembers?.length || 0}
          </span>
          Record Found
        </div>

        <div style={styles.searchBox}>
          <input
            placeholder="Search by national id, first, last name, phone number"
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
              <th>Passport</th>
              <th>Customer</th>
              <th>Added At</th>
              <th>Agent</th>
              <th>Phone</th>
              <th>Branch</th>
              <th>Latest Loan</th>
              <th>Home Direction</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {hasNoResults ? (
              <tr>
                <td
                  colSpan="13"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No Lead Member found
                </td>
              </tr>
            ) : (
              filteredLeadMembers?.map((m, index) => (
                <tr
                  key={m.uid}
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{m.national_id}</td>

                  <td>
                    {m.first_name} {m.last_name}
                  </td>

                  <td>
                    <div>
                      <div>{new Date(m.created_at).toLocaleDateString()}</div>
                      <small style={styles.time}>
                        {new Date(m.created_at).toLocaleTimeString()}
                      </small>
                    </div>
                  </td>

                  <td>
                    {/* Name: {m.added_by.username}<br /> */}
                    Role: BRANCH-MAN
                  </td>

                  <td style={styles.phone}>{m.primary_mobile}</td>

                  <td>
                    HQ
                    <br />
                    <small>Prod: CurePlus</small>
                  </td>

                  <td>--</td>

                  <td>{m.physical_address}</td>

                  <td>
                    <span
                      className={`badge px-2 py-1 ${
                        m.status === "ACTIVE"
                          ? "bg-success"
                          : m.status === "LEAD"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>

                  <td>
                    <div style={styles.actions}>
                      <FaEye
                        style={{ color: "#3498db", cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/dashboard/members/${m.national_id}`)
                        }
                      />
                      <FaComment
                        style={{ color: "#f39c12", cursor: "pointer" }}
                      />
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

      <AddCustomerModal addMember={addMember} />
    </div>
  );
}

export default Leads;

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
