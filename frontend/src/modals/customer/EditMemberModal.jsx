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
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Customer Profile</h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          {/* NAVIGATION */}
          <div className="px-3 pt-3 border-bottom">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "loans" ? "active" : ""}`}
                  onClick={() => setActiveTab("loans")}
                >
                  Loans
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "financial" ? "active" : ""}`}
                  onClick={() => setActiveTab("financial")}
                >
                  Financial
                </button>
              </li>
            </ul>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* ================= PROFILE TAB ================= */}
            {activeTab === "profile" && (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      name="first_name"
                      className="form-control"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      name="last_name"
                      className="form-control"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">National ID</label>
                    <input
                      name="national_id"
                      className="form-control"
                      value={formData.national_id}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      name="primary_mobile"
                      className="form-control"
                      value={formData.primary_mobile}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea
                      name="physical_address"
                      className="form-control"
                      rows="3"
                      value={formData.physical_address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="BLOCKED">BLOCKED</option>
                    </select>
                  </div>
                </div>
              </form>
            )}

            {/* ================= LOANS TAB ================= */}
            {activeTab === "loans" && (
              <div>
                <table className="table table-bordered">
                  <thead>
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
                          <td>{l.code}</td>
                          <td>{l.principal}</td>
                          <td>{l.balance}</td>
                          <td>{l.status?.name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No loans found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* ================= FINANCIAL TAB ================= */}
            {activeTab === "financial" && (
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card p-3">
                    <strong>Total Loans</strong>
                    <div>{loans.length}</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card p-3">
                    <strong>Total Balance</strong>
                    <div>
                      {loans.reduce(
                        (sum, l) => sum + Number(l.balance || 0),
                        0,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>

            {activeTab === "profile" && (
              <button className="btn btn-primary" onClick={handleSubmit}>
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
