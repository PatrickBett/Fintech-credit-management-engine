import { usePayments } from "../hooks/usePayments";
import { useAddMember } from "../hooks/useMembers";
import { FaEye, FaComment, FaPlus, FaSearch } from "react-icons/fa";
import AddCustomerModal from "../modals/customer/AddCustomerModal";
import { useState } from "react";

function Payments() {
 
  const { payments, isPending, error } = usePayments();
  console.log("Payments data:", payments);
   const { addMember } = useAddMember();
 

  if (isPending) return <div style={styles.state}>Loading...</div>;
  if (error) return <div style={styles.state}>Error loading active customers</div>;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Payment <span style={styles.subTitle}>List</span></h2>

        <div style={styles.breadcrumb}>
          Home &gt; Payment
        </div>
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
        data-bs-target="#addMemberModal">
          <FaPlus /> ADD NEW
        </button>
      </div>

      {/* SEARCH ROW */}
      <div style={styles.searchRow}>
        <div style={styles.record}>
          <span style={styles.badgeCount}>{payments?.length || 0}</span>
          Record Found
        </div>

        <div style={styles.searchBox}>
          <input
            placeholder="Enter text and hit search button"
            style={styles.input}
          />
          <button style={styles.searchBtn}>
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table} className="table table-striped table-responsive table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount Paid</th>
              <th>Pay Method</th>
              <th>Record Type</th>
              <th>Transaction Code</th>
              <th>Loan ID</th>
              <th>Loan balance</th>
              <th>Disbursed Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((p, index) => (
              <tr key={p.id} style={{ background: "#f9f9f9", borderBottom: "1px solid #ddd" }}>
               <td>{index + 1}</td>  
                <td>{p.customer.first_name}</td>

                <td>
                  {p.amount}
                </td>

                <td>
                  {p.payment_method.name}
                </td>

                <td>
                  {/* Name: {p.loan.code}<br /> */}
                  Role: BRANCH-MAN
                </td>

                <td style={styles.phone}>{p.transaction_code}</td>

                <td>
                  {p.loan.code}<br />
                  
                </td>

                <td>{p.loan.balance}</td>

                <td>{p.loan.disbursed_date}</td>

                <td>
                  <span style={styles.status}>{p.status.name}</span>
                </td>

                <td>
                  <div style={styles.actions}>
                    <FaEye style={{ color: "#3498db", cursor: "pointer" }} />
                    <FaComment style={{ color: "#f39c12", cursor: "pointer" }} />
                  </div>
                </td>
              </tr>
            ))}
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

export default Payments;

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