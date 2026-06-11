import { useState, useEffect } from "react";
import api from "../../api";

import { useMembers } from "../../hooks/useMembers";
import { useEmployers } from "../../hooks/useEmployers";
import { useLoanStages } from "../../hooks/useTransactions";
import {
  useLoanOfficers,
  useCreditOfficer,
  useCollectors,
} from "../../hooks/useStaffs";

export default function AddLoanModal({ products = [], selectedMember }) {
  const { members } = useMembers();
  const activemembers = members.filter((m) => m.status === "ACTIVE");
  const { employers } = useEmployers();
  const { loanofficers } = useLoanOfficers();
  const { creditofficers } = useCreditOfficer();
  const { collectors } = useCollectors();
  const { loanstages } = useLoanStages();
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    customer: "",
    employer: "",
    product: "",

    principal: "0",
    addons: 0,
    deductions: 0,

    disbursed_amount: "0",
    repayable_amount: "0",
    repaid_amount: "0",
    balance: "0",

    disbursed_date: "",
    due_date: "",
    last_repay_date: "",
    cleared_date: "",
    next_repay_date: "",

    current_installment: 1,
    current_installment_amount: "0",

    current_loan_officer: "",
    current_credit_officer: "",
    current_collector: "",

    stage_id: "",

    created_by: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (selectedMember) {
      setForm((prev) => ({
        ...prev,
        customer_id: selectedMember.uid,
        employer: selectedMember.employer || "",
      }));
    }
  }, [selectedMember]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("loan detailssssss", form);

    try {
      const res = await api.post(
        "http://127.0.0.1:8000/api/transactions/",
        form,
      );
      console.log("posting loan", res.data);

      setLoading(false);

      setSuccessMsg("Loan added successfully!");
      // onClose();
      setTimeout(() => {
        document.getElementById("closeLoanModal").click();
        setSuccessMsg("");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data || "Failed to create loan");
      console.log("error adding loan", err);
    }
  };

  return (
    <div className="modal fade" id="addLoanModal" tabIndex="-1">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">
              Add Loan (Full Transaction) - {selectedMember?.first_name}
            </h5>
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
              {error && (
                <div className="alert alert-danger">
                  {typeof error === "string"
                    ? error
                    : JSON.stringify(error, null, 2)}
                </div>
              )}
              {successMsg && (
                <div className="alert alert-success">{successMsg}</div>
              )}

              <div className="row g-3">
                {/* ================= CUSTOMER INFO ================= */}

                <div className="col-md-6">
                  <label>Customer</label>

                  {selectedMember ? (
                    <>
                      {/* locked input view */}
                      <input
                        className="form-control"
                        value={`${selectedMember.first_name} ${selectedMember.last_name}`}
                        disabled
                      />

                      {/* hidden actual value sent to backend */}
                      <input
                        type="hidden"
                        name="customer"
                        value={selectedMember.uid}
                      />
                    </>
                  ) : (
                    <select
                      name="customer"
                      className="form-select"
                      onChange={handleChange}
                      value={form.customer}
                    >
                      <option value="">Select Customer</option>

                      {activemembers.map((c) => (
                        <option key={c.uid} value={c.uid}>
                          {c.first_name} {c.last_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="col-md-6">
                  <label>Employer</label>
                  {selectedMember ? (
                    <>
                      <input
                        className="form-control"
                        value={selectedMember?.employer_detail?.name}
                        disabled
                      />
                      <input
                        type="hidden"
                        name="employer"
                        value={selectedMember.employer_detail.id}
                      />
                    </>
                  ) : (
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
                  )}
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
                    value={form.principal}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Addons</label>
                  <input
                    type="number"
                    name="addons"
                    value={form.addons}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Deductions</label>
                  <input
                    type="number"
                    value={form.deductions}
                    name="deductions"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Disbursed Amount</label>
                  <input
                    type="number"
                    value={form.disbursed_amount}
                    name="disbursed_amount"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Repayable Amount</label>
                  <input
                    type="number"
                    value={form.repayable_amount}
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
                    value={form.repaid_amount}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Balance</label>
                  <input
                    type="number"
                    value={form.balance}
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
                    value={form.current_installment}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Installment Amount</label>
                  <input
                    type="number"
                    name="current_installment_amount"
                    className="form-control"
                    value={form.current_installment_amount}
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
                    {loanofficers.map((l) => (
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
                    {creditofficers.map((c) => (
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
                    name="stage_id"
                    className="form-select"
                    onChange={handleChange}
                    value={form.stage_id || ""}
                    required
                  >
                    <option value="">Select</option>
                    {loanstages.map((s) => (
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
                id="closeLoanModal"
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
