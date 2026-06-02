import { useState } from "react";

export default function AddEmployerModal({ addEmployer, isPending }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    status: "ACTIVE",
    risk_tier: "MEDIUM",
    deduction_cycle: "MONTHLY",
    max_exposure: "",
    contact_email: "",
    contact_phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data to submit", formData);
    addEmployer(formData);
    alert("Employer added successfully");
    
    setFormData({
      name: "",
      code: "",
      status: "ACTIVE",
      risk_tier: "MEDIUM",
      deduction_cycle: "MONTHLY",
      max_exposure: "",
      contact_email: "",
      contact_phone: "",
    });
    document.getElementById("closeEmployerModal").click();
  };

  return (
    <div
      className="modal fade"
      id="addEmployerModal"
      tabIndex="-1"
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Add Employer</h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="row">

                {/* Employer Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Employer Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Employer Code */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Employer Code</label>
                  <input
                    type="text"
                    name="code"
                    className="form-control"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Status */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="SUSPENDED">Suspended</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                {/* Risk Tier */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Risk Tier</label>
                  <select
                    name="risk_tier"
                    className="form-select"
                    value={formData.risk_tier}
                    onChange={handleChange}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                {/* Deduction Cycle */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Deduction Cycle</label>
                  <select
                    name="deduction_cycle"
                    className="form-select"
                    value={formData.deduction_cycle}
                    onChange={handleChange}
                  >
                    <option value="MONTHLY">Monthly</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="BIWEEKLY">Bi-Weekly</option>
                  </select>
                </div>

                {/* Max Exposure */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Max Exposure (KES)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="max_exposure"
                    className="form-control"
                    value={formData.max_exposure}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">
                    Maximum credit allowed across all employees.
                  </small>
                </div>

                {/* Contact Email */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    name="contact_email"
                    className="form-control"
                    value={formData.contact_email}
                    onChange={handleChange}
                  />
                </div>

                {/* Contact Phone */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Contact Phone</label>
                  <input
                    type="text"
                    name="contact_phone"
                    className="form-control"
                    value={formData.contact_phone}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                id="closeEmployerModal"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save Employer"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}