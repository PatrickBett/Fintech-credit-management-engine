import { useState } from "react";
import { useAddReferee } from "../../hooks/useMembers";

function AddRefereeModal({ customerId }) {
  const { addReferee } = useAddReferee();
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    address: "",
    relationship: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      customer: customerId,
    };
    console.log("Submitting payload:", payload);
    addReferee(payload, {
      onSuccess: () => {
        setSuccessMsg("Referee added successfully");
        setTimeout(() => {
          document.getElementById("addRefereeModal").click();
        }, 2000);
      },
        onError: (error) => {
            const data = error?.response?.data;
            console.log("Error adding referee:", data);
            setError(data?.detail || "An error occurred while adding the referee");
        }
    });

    // setFormData({
    //   name: "",
    //   mobile_no: "",
    //   address: "",
    //   relationship: "",
    // });
  };

  return (
    <div
      className="modal fade"
      id="addRefereeModal"
      tabIndex="-1"
      aria-labelledby="addRefereeModalLabel"
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addRefereeModalLabel">
              Add Referee
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <form onSubmit={handleSubmit}>
            {successMsg && (
              <div className="alert alert-success m-3" role="alert">
                {successMsg}
              </div>
            )}
            {error && (
              <div className="alert alert-danger m-3" role="alert">
                {error}
              </div>
            )}
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Mobile Phone</label>
                  <input
                    type="text"
                    name="mobile_no"
                    className="form-control"
                    value={formData.mobile_no}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Relationship</label>
                  <input
                    type="text"
                    name="relationship"
                    className="form-control"
                    value={formData.relationship}
                    onChange={handleChange}
                    placeholder="Wife, Brother, Friend..."
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Save Referee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRefereeModal;
