import React from "react";
import { useUpdateMemberStatus } from "../../hooks/useMembers";

function EditStatusModal({ status, setStatus, customerId, onClose }) {
  const { mutate: updateStatus, isPending } = useUpdateMemberStatus();

  const handleSubmit = () => {
    updateStatus(
      {
        id: customerId,
        status,
      },
      {
        onSuccess: () => {
          document.getElementById("closeStatusModal")?.click();
        },
      },
    );
  };

  return (
    <div
      className="modal fade"
      id="editStatusModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Edit Status</h5>
            <button
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body px-4 py-4">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="LEAD">🟡 LEAD</option>
              <option value="ACTIVE">🟢 ACTIVE</option>
              <option value="BLOCKED">🔴 BLOCKED</option>
            </select>
          </div>

          <div className="modal-footer">
            <button
              id="closeStatusModal"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={handleSubmit}
              disabled={isPending}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStatusModal;
