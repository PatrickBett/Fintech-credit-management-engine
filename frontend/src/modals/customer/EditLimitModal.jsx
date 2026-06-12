import React, { useState } from "react";
import { useUpdateMemberLimit } from "../../hooks/useMembers";

function EditLimitModal({ limit, setLimit, customerId, onClose }) {
  const { mutate: updateLimit, isPending } = useUpdateMemberLimit();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = () => {
    updateLimit(
      {
        id: customerId,
        limit,
      },
      {
        onSuccess: () => {
          setSuccessMsg("Limit Updated Successfully");
          setTimeout(() => {
            document.getElementById("closeLimitModal")?.click();
          }, 2000);
        },
      },
    );
  };

  return (
    <div
      className="modal fade"
      id="editLimitModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Edit Limit</h5>
            <button
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>
          {successMsg && (
            <div
              className="alert alert-success mt-2"
              style={{
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              {successMsg}
            </div>
          )}

          <div className="modal-body px-4 py-4">
            <input
              className="form-input"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button
              id="closeLimitModal"
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

export default EditLimitModal;
