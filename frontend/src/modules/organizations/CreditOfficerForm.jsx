import { useState } from "react";
import api from "../../api";

export default function CreditOfficerForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post(
        "http://127.0.0.1:8000/api/transactions/creditofficers/",
        form,
      );
      setForm({ name: "" });
      onSuccess?.();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mb-3 shadow-sm border-0">
      <h5 className="mb-3">Credit Officer</h5>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Enter credit officer name"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Saving..." : "Add Credit Officer"}
        </button>
      </form>
    </div>
  );
}
