import { useEffect, useState } from "react";
import api from "../../api";

function EditMemberModal({ member, onSuccess }) {
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    national_id: "",
    primary_mobile: "",
    physical_address: "",
    status: "",
  });

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    if (member) {
      setFormData({
        first_name: member.first_name || "",
        last_name: member.last_name || "",
        national_id: member.national_id || "",
        primary_mobile: member.primary_mobile || "",
        physical_address: member.physical_address || "",
        status: member.status || "",
      });

      fetchMemberLoans(member.uid);
    }
  }, [member]);

  const fetchMemberLoans = async (customerId) => {
    try {
      const res = await api.get(`/transactions/?customer=${customerId}`);
      setLoans(res.data);
    } catch (err) {
      console.log("Failed to load loans", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/customers/${member.uid}/`, formData);

      onSuccess?.();

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("editMemberModal"),
      );

      modal?.hide();
    } catch (error) {
      console.error(error);
      alert("Failed to update customer");
    }
  };

  return (
    <div
      className="modal fade"
      id="editMemberModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg rounded-4">
          {/* HEADER */}
          <div
            className="modal-header text-white"
            style={{ background: "#009A44" }} // CurePlus GREEN
          >
            <h5 className="modal-title fw-semibold">Customer Profile</h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>

          {/* TABS */}
          <div
            className="px-4 pt-3 border-bottom"
            style={{ background: "#f5f7fb" }}
          >
            
          </div>

          {/* BODY */}
          <div className="modal-body p-4" style={{ background: "#f5f7fb" }}>
            {/* ================= PROFILE ================= */}
            {activeTab === "profile" && (
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  {[
                    ["First Name", "first_name"],
                    ["Last Name", "last_name"],
                    ["National ID", "national_id"],
                    ["Phone", "primary_mobile"],
                  ].map(([label, name]) => (
                    <div className="col-md-6" key={name}>
                      <label className="form-label fw-semibold">{label}</label>

                      <input
                        name={name}
                        className="form-control shadow-sm"
                        style={{ borderRadius: "10px" }}
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}

                  <div className="col-12">
                    <label className="form-label fw-semibold">Address</label>

                    <textarea
                      name="physical_address"
                      className="form-control shadow-sm"
                      rows="3"
                      style={{ borderRadius: "10px" }}
                      value={formData.physical_address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>

                    <select
                      name="status"
                      className="form-select shadow-sm"
                      style={{ borderRadius: "10px" }}
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="LEAD">🟡 LEAD</option>
                      <option value="ACTIVE">🟢 ACTIVE</option>
                      <option value="BLOCKED">🔴 BLOCKED</option>
                    </select>
                  </div>
                </div>
              </form>
            )}

            {/* ================= LOANS ================= */}
            {activeTab === "loans" && (
              <div className="card border-0 shadow-sm">
                <div
                  className="card-header text-white"
                  style={{ background: "#009A44" }}
                >
                  LOAN HISTORY
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead style={{ background: "#eaf7ef" }}>
                      <tr>
                        <th>Code</th>
                        <th>Principal</th>
                        <th>Balance</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loans.length > 0 ? (
                        loans.map((l) => (
                          <tr key={l.id}>
                            <td className="fw-semibold">{l.code}</td>
                            <td>{l.principal}</td>
                            <td>{l.balance}</td>
                            <td>
                              <span
                                className="badge"
                                style={{
                                  background:
                                    l.status?.name === "ACTIVE"
                                      ? "#009A44"
                                      : l.status?.name === "LEAD"
                                        ? "#F4B400"
                                        : "#E4002B",
                                  color: "#fff",
                                }}
                              >
                                {l.status?.name}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center text-muted py-3"
                          >
                            No loans found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= FINANCIAL ================= */}
            {activeTab === "financial" && (
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm p-3">
                    <small style={{ color: "#666" }}>Total Loans</small>
                    <h3 className="mb-0" style={{ color: "#009A44" }}>
                      {loans.length}
                    </h3>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 shadow-sm p-3">
                    <small style={{ color: "#666" }}>Total Balance</small>
                    <h3 className="mb-0" style={{ color: "#009A44" }}>
                      {loans.reduce(
                        (sum, l) => sum + Number(l.balance || 0),
                        0,
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-footer" style={{ background: "#f5f7fb" }}>
            <button
              type="button"
              className="btn"
              data-bs-dismiss="modal"
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              Close
            </button>

            {activeTab === "profile" && (
              <button
                className="btn text-white px-4"
                onClick={handleSubmit}
                style={{
                  background: "#E4002B", // CurePlus RED
                  borderRadius: "10px",
                }}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMemberModal;
