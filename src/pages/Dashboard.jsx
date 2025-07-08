import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAppointment } from "../store/appointmentSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const reduxAppointments = useSelector(
    (state) => state?.appointments?.list ?? []
  );

  const [localAppointments, setLocalAppointments] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    setLocalAppointments(savedAppointments);
    savedAppointments.forEach((appointment) => {
      if (!reduxAppointments.find((a) => a.id === appointment.id)) {
        dispatch(addAppointment(appointment));
      }
    });
  }, []);
  const allAppointments = [
    ...new Map(
      [...reduxAppointments, ...localAppointments].map((item) => [
        item.id,
        item,
      ])
    ).values(),
  ];

  // Filter appointments based on status and search term
  const filteredAppointments = allAppointments.filter((appointment) => {
    const matchesFilter =
      selectedFilter === "all" ||
      appointment.status?.toLowerCase() === selectedFilter;
    const matchesSearch =
      appointment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  const pendingCount = allAppointments.filter(
    (a) => a.status === "Pending"
  ).length;
  const completedCount = allAppointments.filter(
    (a) => a.status === "Completed"
  ).length;
  const inProgressCount = allAppointments.filter(
    (a) => a.status === "In Progress"
  ).length;
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: isModalOpen ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "95%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    animation: "modalFadeIn 0.3s ease-out",
  };

  const modalCloseButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "#f8f9fa",
    borderRadius: "50%",
    width: "46px",
    height: "46px",
    fontSize: "40px",
    cursor: "pointer",
    color: "#666",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalDetailStyle = {
    marginBottom: "24px",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  };

  const modalLabelStyle = {
    fontWeight: "600",
    color: "#94a3b8",
    marginBottom: "8px",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const modalValueStyle = {
    color: "#1e293b",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "1.5",
  };

  // Add animation styles
  if (!document.getElementById("modal-animations")) {
    const styleElement = document.createElement("style");
    styleElement.id = "modal-animations";
    styleElement.textContent = `
      @keyframes modalFadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styleElement);
  }

  // Function to handle opening the modal

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  };

  const titleSectionStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "8px",
  };

  const subtitleStyle = {
    color: "#7f8c8d",
    fontSize: "14px",
  };

  const newButtonStyle = {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
  };

  const statsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  };

  const statCardStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  };

  const filterContainerStyle = {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  };

  const filterButtonStyle = {
    padding: "8px 16px",
    border: "1px solid #e0e0e0",
    borderRadius: "20px",
    backgroundColor: "white",
    color: "#666",
    cursor: "pointer",
    fontSize: "14px",
  };

  const filterButtonActiveStyle = {
    ...filterButtonStyle,
    backgroundColor: "#3498db",
    color: "white",
    border: "1px solid #3498db",
  };

  const searchInputStyle = {
    padding: "8px 16px",
    border: "1px solid #e0e0e0",
    borderRadius: "20px",
    width: "250px",
    fontSize: "14px",
    marginLeft: "auto",
  };
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    setAppointments(savedAppointments);
    console.log("Saved App", savedAppointments);

    // Calculate stats
    const totalPatients = new Set(savedAppointments.map((app) => app.email))
      .size;
    const pendingAppointments = savedAppointments.filter(
      (app) => app.status === "Pending"
    ).length;
    const completedAppointments = savedAppointments.filter(
      (app) => app.status === "Completed"
    ).length;
    const totalRevenue = savedAppointments
      .filter((app) => app.cost)
      .reduce((sum, app) => sum + parseFloat(app.cost || 0), 0);

    setStats({
      totalPatients,
      pendingAppointments,
      completedAppointments,
      totalRevenue,
    });
  }, []);

  const containerStyle = {
    padding: "40px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  };

  const renderAdminDashboard = () => (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "30px", color: "#2c3e50" }}>
        Admin Dashboard
      </h1>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <h3>Total Patients</h3>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#3498db" }}
          >
            {stats.totalPatients}
          </div>
        </div>
        <div style={cardStyle}>
          <h3>Total Appointments</h3>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#e67e22" }}
          >
            {stats.pendingAppointments + stats.completedAppointments}
          </div>
        </div>
        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#8e44ad" }}
          >
            ₹ {stats.totalRevenue.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
  console.log(filteredAppointments);
  const renderPatientDashboard = () => {
    const patientAppointments = appointments.filter(
      (app) => app.email.toLowerCase() === user.email.toLowerCase()
    );

    return (
      <div style={containerStyle}>
        <h1 style={{ marginBottom: "30px", color: "#2c3e50" }}>
          Welcome, {user?.username}!
        </h1>
        <div style={gridStyle}>
          <div style={cardStyle}>
            <h3>Your Appointments</h3>
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#3498db" }}
            >
              {appointments.length}
            </div>
          </div>
          <div style={cardStyle}>
            <h3>Pending</h3>
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#e67e22" }}
            >
              {
                filteredAppointments.filter((app) => app.status === "Pending")
                  .length
              }
            </div>
          </div>
          <div style={cardStyle}>
            <h3>Completed</h3>
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#27ae60" }}
            >
              {
                filteredAppointments.filter((app) => app.status === "Completed")
                  .length
              }
            </div>
          </div>
        </div>
        <div style={filterContainerStyle}>
          <button
            style={
              selectedFilter === "all"
                ? filterButtonActiveStyle
                : filterButtonStyle
            }
            onClick={() => setSelectedFilter("all")}
          >
            All Appointments
          </button>
          <button
            style={
              selectedFilter === "pending"
                ? filterButtonActiveStyle
                : filterButtonStyle
            }
            onClick={() => setSelectedFilter("pending")}
          >
            Pending
          </button>
          <button
            style={
              selectedFilter === "in progress"
                ? filterButtonActiveStyle
                : filterButtonStyle
            }
            onClick={() => setSelectedFilter("in progress")}
          >
            In Progress
          </button>
          <button
            style={
              selectedFilter === "completed"
                ? filterButtonActiveStyle
                : filterButtonStyle
            }
            onClick={() => setSelectedFilter("completed")}
          >
            Completed
          </button>
          <input
            type="text"
            placeholder="Search appointments..."
            style={searchInputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginBottom: "20px" }}>Your Recent Appointments</h2>
          {filteredAppointments.length > 0 ? (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        borderBottom: "2px solid #eee",
                      }}
                    >
                      Patient
                    </th>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        borderBottom: "2px solid #eee",
                      }}
                    >
                      Scheduled At
                    </th>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        borderBottom: "2px solid #eee",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "right",
                        borderBottom: "2px solid #eee",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <div style={{ fontWeight: "500" }}>
                          {appointment.name}
                        </div>
                        <div style={{ color: "#666", fontSize: "14px" }}>
                          ID: #{appointment.id}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <div style={{ fontWeight: "500" }}>
                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <span
                          style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            backgroundColor: "#e8f4fd",
                            color: "#3498db",
                            fontSize: "14px",
                          }}
                        >
                          {appointment.status || "Pending"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #eee",
                          textAlign: "right",
                        }}
                      >
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#e8f4fd",
                            color: "#3498db",
                            cursor: "pointer",
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No appointments found</p>
          )}
        </div>
        <div style={modalOverlayStyle} onClick={() => setIsModalOpen(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button
              style={modalCloseButtonStyle}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            {selectedAppointment && (
              <div style={{ padding: "20px" }}>
                <h2
                  style={{
                    marginBottom: "30px",
                    color: "#1e293b",
                    fontSize: "28px",
                    fontWeight: "700",
                    borderBottom: "2px solid #e2e8f0",
                    paddingBottom: "15px",
                  }}
                >
                  Appointment Details
                </h2>

                {/* Basic Information */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "24px",
                    marginBottom: "30px",
                  }}
                >
                  <div style={modalDetailStyle}>
                    <div style={modalLabelStyle}>Patient Name</div>
                    <div style={modalValueStyle}>
                      {selectedAppointment.name}
                    </div>
                  </div>

                  <div style={modalDetailStyle}>
                    <div style={modalLabelStyle}>Email</div>
                    <div style={modalValueStyle}>
                      {selectedAppointment.email}
                    </div>
                  </div>

                  <div style={modalDetailStyle}>
                    <div style={modalLabelStyle}>Status</div>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        backgroundColor:
                          selectedAppointment.status === "Pending"
                            ? "#fff8e1"
                            : "#e8f5e9",
                        color:
                          selectedAppointment.status === "Pending"
                            ? "#f57c00"
                            : "#2e7d32",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      {selectedAppointment.status || "Pending"}
                    </div>
                  </div>

                  <div style={modalDetailStyle}>
                    <div style={modalLabelStyle}>Submitted On</div>
                    <div style={modalValueStyle}>
                      {selectedAppointment.submittedAt}
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "30px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "24px",
                    }}
                  >
                    <div style={{ ...modalDetailStyle, borderBottom: "none" }}>
                      <div style={modalLabelStyle}>Total Cost</div>
                      <div
                        style={{
                          ...modalValueStyle,
                          color: "#2e7d32",
                          fontSize: "20px",
                        }}
                      >
                        ₹ {selectedAppointment.cost || "Not set"}
                      </div>
                    </div>

                    <div style={{ ...modalDetailStyle, borderBottom: "none" }}>
                      <div style={modalLabelStyle}>Next Appointment</div>
                      <div style={modalValueStyle}>
                        {selectedAppointment.nextDate || "Not scheduled"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div style={{ marginBottom: "30px" }}>
                  <div style={modalDetailStyle}>
                    <div style={modalLabelStyle}>Treatment Plan</div>
                    <div style={modalValueStyle}>
                      {selectedAppointment.treatment || "Not specified"}
                    </div>
                  </div>

                  <div style={modalDetailStyle}>
                    <div style={modalLabelStyle}>Admin Notes</div>
                    <div
                      style={{
                        ...modalValueStyle,
                        backgroundColor: "#f8fafc",
                        padding: "15px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      {selectedAppointment.comments || "No comments from admin"}
                    </div>
                  </div>

                  {selectedAppointment.fileName && (
                    <div style={{ ...modalDetailStyle, marginBottom: 0 }}>
                      <div style={modalLabelStyle}>Attached File</div>
                      <div
                        style={{
                          ...modalValueStyle,
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#3498db",
                          backgroundColor: "#f8fafc",
                          padding: "12px",
                          borderRadius: "8px",
                        }}
                      >
                        📎 {selectedAppointment.fileName}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return user?.role === "admin"
    ? renderAdminDashboard()
    : renderPatientDashboard();
};

export default Dashboard;
