import { useState } from "react";
import api from "../../api";
import { useMembers } from "../../hooks/useMembers";
import { useEmployers } from "../../hooks/useEmployers";

export default function AddLoanModal({
 
  
  products = [],
  loanOfficers = [],
  creditOfficers = [],
  collectors = [],
  stages = [],
  statuses = [],
  onSuccess,
}) {
    const { members } = useMembers();
    const { employers } = useEmployers();
  const [form, setForm] = useState({
    customer: "",
    employer: "",
    product: "",

    principal: "",
    addons: 0,
    deductions: 0,

    disbursed_amount: "",
    repayable_amount: "",
    repaid_amount: "",
    balance: "",

    disbursed_date: "",
    due_date: "",
    last_repay_date: "",
    cleared_date: "",
    next_repay_date: "",

    current_installment: 1,
    current_installment_amount: "",

    current_loan_officer: "",
    current_credit_officer: "",
    current_collector: "",

    stage: "",
    status: "",

    created_by: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/transactions/", form);

      setLoading(false);
      onSuccess?.();

      const modalEl = document.getElementById("addLoanModal");
      const modal = window.bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.detail || "Failed to create loan");
    }
  };

  return (
    <div className="modal fade" id="addLoanModal" tabIndex="-1">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Add Loan (Full Transaction)</h5>
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>

          <form onSubmit={handleSubmit}>
            <div
              className="modal-body "
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="row g-3">
                {/* ================= CUSTOMER INFO ================= */}
                <div className="col-md-6">
                  <label>Customer</label>
                  <select
                    name="customer"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {members.map((c) => (
                      <option key={c.uid} value={c.id}>
                        {c.first_name} {c.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Employer</label>
                  <select
                    name="employer"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Optional</option>
                    {employers.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Product</label>
                  <select
                    name="product"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Optional</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ================= LOAN FINANCIALS ================= */}
                <div className="col-md-4">
                  <label>Principal</label>
                  <input
                    type="number"
                    name="principal"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Addons</label>
                  <input
                    type="number"
                    name="addons"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Deductions</label>
                  <input
                    type="number"
                    name="deductions"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Disbursed Amount</label>
                  <input
                    type="number"
                    name="disbursed_amount"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Repayable Amount</label>
                  <input
                    type="number"
                    name="repayable_amount"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Repaid Amount</label>
                  <input
                    type="number"
                    name="repaid_amount"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Balance</label>
                  <input
                    type="number"
                    name="balance"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                {/* ================= DATES ================= */}
                <div className="col-md-4">
                  <label>Disbursed Date</label>
                  <input
                    type="date"
                    name="disbursed_date"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="due_date"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Last Repay Date</label>
                  <input
                    type="date"
                    name="last_repay_date"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Cleared Date</label>
                  <input
                    type="date"
                    name="cleared_date"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Next Repay Date</label>
                  <input
                    type="date"
                    name="next_repay_date"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                {/* ================= INSTALLMENTS ================= */}
                <div className="col-md-4">
                  <label>Current Installment</label>
                  <input
                    type="number"
                    name="current_installment"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Installment Amount</label>
                  <input
                    type="number"
                    name="current_installment_amount"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                {/* ================= ASSIGNMENTS ================= */}
                <div className="col-md-4">
                  <label>Loan Officer</label>
                  <select
                    name="current_loan_officer"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {loanOfficers.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label>Credit Officer</label>
                  <select
                    name="current_credit_officer"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {creditOfficers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label>Collector</label>
                  <select
                    name="current_collector"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {collectors.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ================= WORKFLOW ================= */}
                <div className="col-md-6">
                  <label>Stage</label>
                  <select
                    name="stage"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {stages.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Status</label>
                  <select
                    name="status"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {statuses.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Loan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
