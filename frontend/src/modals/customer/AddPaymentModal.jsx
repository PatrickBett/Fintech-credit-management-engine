import { useState } from "react";
import { useEmployers } from "../../hooks/useEmployers";
import { useMembers } from "../../hooks/useMembers";
import { useTransactions } from "../../hooks/useTransactions";

import {
  usePaymentStatus,
  usePaymentFor,
  usePaymentMethods,
  usePayments,
  useAddPayment,
} from "../../hooks/usePayments";
export default function AddPaymentModal({ onClose }) {
  const { employers } = useEmployers();
  const { transactions } = useTransactions();
  const { addPayment } = useAddPayment();
  const { paymentStatuses } = usePaymentStatus();
  const { paymentFors } = usePaymentFor();
  const { paymentMethods } = usePaymentMethods();
  const { members, isPending, error } = useMembers();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    transaction_code: "",
    customer: "",
    loan: "",
    amount: "",
    mobile_number: "",
    payment_method: "",
    payment_for: "",
    group: "",
    date_made: "",
    status: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Payment", formData);
    addPayment(formData, {
      onSuccess: () => {
        setSuccessMsg("Payment saved successfully!");

        // Close after 2 seconds
        setTimeout(() => {
          document.getElementById("closePaymentModal").click();
          setSuccessMsg("");
        }, 2000);
      },
      onError: (error) => {
        const data = error?.response?.data;
        console.log("error", data);

        const msg = data
          ? Object.values(data).flat().join(", ")
          : error?.message || "Unknown error";
        setSuccessMsg("");
        setErrorMsg(msg);
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      },
    });
  };

  return (
    <div
      className="modal fade"
      id="addPaymentModal"
      tabIndex="-1"
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Add Payment</h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={onClose}
            />
          </div>

          {/* BODY */}
          <form onSubmit={handleSubmit}>
            {successMsg && (
              <div className="alert alert-success mx-3 mt-3">{successMsg}</div>
            )}

            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <div
              className="modal-body"
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              <div className="row">
                {/* Transaction Code */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Transaction Code</label>
                  <input
                    type="text"
                    name="transaction_code"
                    className="form-control"
                    value={formData.transaction_code}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Customer */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Customer</label>
                  <select
                    name="customer"
                    className="form-select"
                    value={formData.customer}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Customer</option>
                    {members.map((m) => (
                      <option key={m.uid} value={m.uid}>
                        {m.first_name} {m.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Loan */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Loan</label>
                  <select
                    name="loan"
                    className="form-select"
                    value={formData.loan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Loan</option>
                    {transactions.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.code}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Mobile */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile_number"
                    className="form-control"
                    value={formData.mobile_number}
                    onChange={handleChange}
                  />
                </div>

                {/* Payment Method */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    name="payment_method"
                    className="form-select"
                    value={formData.payment_method}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Method</option>
                    {paymentMethods.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment For */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Payment For</label>
                  <select
                    name="payment_for"
                    className="form-select"
                    value={formData.payment_for}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {paymentFors.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Employer */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Employer</label>
                  <select
                    name="group"
                    className="form-select"
                    value={formData.group}
                    onChange={handleChange}
                  >
                    <option value="">Select Employer</option>
                    {employers.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date Made</label>
                  <input
                    type="date"
                    name="date_made"
                    className="form-control"
                    value={formData.date_made}
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
                    required
                  >
                    <option value="">Select Status</option>
                    {paymentStatuses.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Comments */}
                <div className="col-12 mb-3">
                  <label className="form-label">Comments</label>
                  <textarea
                    name="comments"
                    className="form-control"
                    rows="3"
                    value={formData.comments}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closePaymentModal"
              >
                Close
              </button>

              <button type="submit" className="btn btn-success">
                Save Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
