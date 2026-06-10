export default function ConfirmModal({
  id = "confirmstatusmodal",
  title,
  message,
  onConfirm,
}) {
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title || "Confirm Action"}</h5>
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body">{message || "Are you sure?"}</div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              No
            </button>

            <button
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
