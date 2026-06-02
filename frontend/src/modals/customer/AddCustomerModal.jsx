import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";

export default function AddCustomerModal({ addMember, onClose }) {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    national_id: "",
    employer: "",
    gender: "M",
    net_salary: "",
    dob: "",
    physical_address: "",
    primary_mobile: "",
    email: "",
    status: "LEAD",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", formData);
    addMember(formData, {
      onSuccess: () => {
        setSuccessMsg("Member added successfully!");
        // onClose();
        setTimeout(() => {
          document.getElementById("closeMemberModal").click();
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
    <>
      <div
        className="modal fade"
        id="addMemberModal"
        tabIndex="-1"
        aria-hidden="true"
        role="dialog"

        //   style={{
        //   position: "fixed",
        //   inset: 0,
        //   backgroundColor: "rgba(0,0,0,0.5)",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   zIndex: 1000,
        // }}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Member</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={onClose}
              />
            </div>

            <form onSubmit={handleSubmit}>
              {successMsg && (
                <div className="alert alert-success mx-3 mt-3">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="alert alert-danger mx-3 mt-3">{errorMsg}</div>
              )}
              <div
                className="modal-body"
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                }}
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">National ID</label>
                    <input
                      type="text"
                      name="national_id"
                      className="form-control"
                      value={formData.national_id}
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div className="col-md-6 mb-3">
                    <label className="form-label">Employer</label>
                    <select
                      name="employer"
                      className="form-select"
                      value={formData.employer}
                      onChange={handleChange}
                    >
                      <option value="">Select Employer</option>

                      {employers.map((employer) => (
                        <option
                          key={employer.id}
                          value={employer.id}
                        >
                          {employer.name}
                        </option>
                      ))}
                    </select>
                  </div> */}

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      className="form-control"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Net Salary</label>
                    <input
                      type="number"
                      step="0.01"
                      name="net_salary"
                      className="form-control"
                      value={formData.net_salary}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="text"
                      name="primary_mobile"
                      className="form-control"
                      value={formData.primary_mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="form-label">Physical Address</label>
                    <textarea
                      name="physical_address"
                      className="form-control"
                      rows="3"
                      value={formData.physical_address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="LEAD">Lead</option>
                      <option value="ACTIVE">Active</option>
                      <option value="BLOCKED">Blocked</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="closeMemberModal"
                >
                  Close
                </button>

                <button type="submit" className="btn btn-primary">
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
