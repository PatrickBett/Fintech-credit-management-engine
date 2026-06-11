import { useTransactions } from "../../hooks/useTransactions";
import { useAddMember } from "../../hooks/useMembers";
import { FaEye, FaComment, FaPlus, FaSearch } from "react-icons/fa";
import AddLoanModal from "../../modals/customer/AddLoanModal";
import { useState } from "react";

function AllLoans() {
  const { transactions, isPending, error } = useTransactions();
  const [selectedLoan, setSelectedLoan] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  console.log("Transactions data:", transactions);
  const { addMember } = useAddMember();

  //search functionality
  const filteredTransactions = transactions?.filter((t) => {
    const term = searchTerm.toLowerCase();
    return (
      t?.code?.toLowerCase().includes(term) ||
      t?.customer?.first_name?.toLowerCase().includes(term) ||
      t?.customer?.last_name?.toLowerCase().includes(term) ||
      t?.stage?.name?.toLowerCase().includes(term)
    );
  });

  //
  const hasNoResults =
    filteredTransactions && filteredTransactions.length === 0;

  if (isPending) return <div style={styles.state}>Loading...</div>;
  if (error)
    return <div style={styles.state}>Error loading active customers</div>;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>
          Loans <span style={styles.subTitle}>List</span>
        </h2>

        <div style={styles.breadcrumb}>Home &gt; Loans</div>
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
          data-bs-target="#addLoanModal"
        >
          <FaPlus /> ADD NEW
        </button>
      </div>

      {/* SEARCH ROW */}
      <div style={styles.searchRow}>
        <div style={styles.record}>
          <span style={styles.badgeCount}>
            {filteredTransactions?.length || 0}
          </span>
          Record Found
        </div>

        <div style={styles.searchBox}>
          <input
            placeholder="Search by name,code,status"
            style={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button style={styles.searchBtn}>
            <FaSearch /> Search
          </button> */}
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
              <th>CODE</th>
              <th>Customer</th>
              <th>Principal</th>
              <th>AddOns</th>
              <th>Deductions</th>
              <th>Amount RePaid</th>
              <th>Balance</th>
              <th>Disbursed Date</th>
              <th>Due Date</th>
              <th>BDO</th>
              <th>Status</th>
              <th>Flag</th>
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
                  No Loan found
                </td>
              </tr>
            ) : (
              filteredTransactions?.map((t) => (
                <tr
                  key={t.id}
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td>{t.code}</td>
                  <td>
                    {t.customer.first_name} {t.customer.last_name} {t?.customer?.primary_mobile}
                  </td>

                  <td>{t.principal}</td>

                  <td>{t.addons}</td>

                  <td>
                    {t.deductions}
                    <br />
                  </td>

                  <td style={styles.phone}>{t.repaid_amount}</td>

                  <td>
                    {t.balance}
                    <br />
                  </td>

                  <td>{t.disbursed_date}</td>

                  <td>{t.due_date}</td>
                  <td>CO:</td>

                  <td>
                    <span style={styles.status}>{t?.stage?.name}</span>
                  </td>
                  <td>---</td>

                  <td>
                    <div style={styles.actions}>
                      <FaEye
                        style={{ color: "#3498db", cursor: "pointer" }}
                        onClick={() => {
                          setSelectedLoan(t);
                          console.log("selected", t);
                        }}
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

      <AddLoanModal />
    </div>
  );
}

export default AllLoans;

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
    background: "green",
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
