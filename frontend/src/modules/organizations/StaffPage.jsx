import LoanOfficerForm from "./LoanOfficerForm";
import CreditOfficerForm from "./CreditOfficerForm";
import CollectorForm from "./CollectorForm";

import {
  useLoanOfficers,
  useCreditOfficer,
  useCollectors,
} from "../../hooks/useStaffs";

import { FaUserTie, FaUserCheck, FaUserShield } from "react-icons/fa";

export default function StaffPage() {
  const { loanofficers } = useLoanOfficers();
  const { creditofficers } = useCreditOfficer();
  const { collectors } = useCollectors();

  return (
    <div className="container-fluid py-4 px-lg-4">
      {/* HEADER */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ color: "#009A44" }}>
          Staff Management
        </h3>

        <p className="text-muted mb-0">
          Configure Loan Officers, Credit Officers and Collectors
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div
                className="p-3 rounded-circle me-3"
                style={{
                  background: "#009A44",
                  color: "white",
                }}
              >
                <FaUserTie size={22} />
              </div>

              <div>
                <h6 className="text-muted mb-1">Loan Officers</h6>

                <h3 className="fw-bold mb-0">{loanofficers.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div
                className="p-3 rounded-circle me-3"
                style={{
                  background: "#E4002B",
                  color: "white",
                }}
              >
                <FaUserCheck size={22} />
              </div>

              <div>
                <h6 className="text-muted mb-1">Credit Officers</h6>

                <h3 className="fw-bold mb-0">{creditofficers.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div
                className="p-3 rounded-circle me-3"
                style={{
                  background: "#6f42c1",
                  color: "white",
                }}
              >
                <FaUserShield size={22} />
              </div>

              <div>
                <h6 className="text-muted mb-1">Collectors</h6>

                <h3 className="fw-bold mb-0">{collectors.length}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAFF SECTIONS */}
      <div className="row g-4">
        {/* LOAN OFFICERS */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div
              className="card-header text-white fw-semibold"
              style={{ background: "#009A44" }}
            >
              <FaUserTie className="me-2" />
              Loan Officers
            </div>

            <div className="card-body">
              <LoanOfficerForm />

              <hr />

              <div
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                }}
              >
                {loanofficers.length > 0 ? (
                  <ul className="list-group">
                    {loanofficers.map((l) => (
                      <li
                        key={l.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {l.name}

                        <span className="badge bg-success">LO</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-muted py-4">
                    No Loan Officers Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CREDIT OFFICERS */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div
              className="card-header text-white fw-semibold"
              style={{ background: "#E4002B" }}
            >
              <FaUserCheck className="me-2" />
              Credit Officers
            </div>

            <div className="card-body">
              <CreditOfficerForm />

              <hr />

              <div
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                }}
              >
                {creditofficers.length > 0 ? (
                  <ul className="list-group">
                    {creditofficers.map((c) => (
                      <li
                        key={c.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {c.name}

                        <span
                          className="badge"
                          style={{
                            background: "#E4002B",
                          }}
                        >
                          CO
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-muted py-4">
                    No Credit Officers Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* COLLECTORS */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div
              className="card-header text-white fw-semibold"
              style={{ background: "#6f42c1" }}
            >
              <FaUserShield className="me-2" />
              Collectors
            </div>

            <div className="card-body">
              <CollectorForm />

              <hr />

              <div
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                }}
              >
                {collectors.length > 0 ? (
                  <ul className="list-group">
                    {collectors.map((c) => (
                      <li
                        key={c.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {c.name}

                        <span
                          className="badge"
                          style={{
                            background: "#6f42c1",
                          }}
                        >
                          COL
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-muted py-4">
                    No Collectors Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
