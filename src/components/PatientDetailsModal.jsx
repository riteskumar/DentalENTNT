import React, { useState } from "react";
import AppointmentDetails from "./appointmentdetails";
const PatientDetailsModal = ({ patient, onClose, onUpdateAppointment }) => {
  console.log(patient);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const handleFileDownload = (fileData, fileName) => {
    if (fileData) {
      const link = document.createElement("a");
      link.href = fileData;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  };

  const modalContentStyle = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "95%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    animation: "modalFadeIn 0.3s ease-out",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#f8f9fa",
    border: "none",
    borderRadius: "50%",
    width: "46px",
    height: "46px",
    fontSize: "40px",
    cursor: "pointer",
    color: "#666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  };

  const sectionStyle = {
    marginBottom: "30px",
    padding: "25px",
    borderRadius: "16px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
  };
  const infoGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginTop: "15px",
  };

  const infoItemStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const labelStyle = {
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const valueStyle = {
    color: "#1e293b",
    fontSize: "16px",
    fontWeight: "500",
  };

  const appointmentCardStyle = {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    onUpdateAppointment(updatedAppointment);
    setSelectedAppointment(null);
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>
          ×
        </button>

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
          Patient Details
        </h2>

        <div style={sectionStyle}>
          <h3
            style={{
              color: "#334155",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            {" "}
            Personal Information
          </h3>
          <div style={infoGridStyle}>
            <div style={infoItemStyle}>
              <span style={labelStyle}>Name</span>
              <span style={valueStyle}>{patient?.name}</span>
            </div>
            <div style={infoItemStyle}>
              <span style={labelStyle}>Email</span>
              <span style={valueStyle}>{patient?.email}</span>
            </div>
            <div style={infoItemStyle}>
              <span style={labelStyle}>Phone</span>
              <span style={valueStyle}>{patient?.phone}</span>
            </div>
            <div style={infoItemStyle}>
              <span style={labelStyle}>Date of Birth</span>
              <span style={valueStyle}>
                {patient?.dob
                  ? new Date(patient.dob).toLocaleDateString("en-GB")
                  : "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {patient.appointments && patient.appointments.length > 0 && (
          <div style={sectionStyle}>
            <h3
              style={{
                color: "#334155",
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Appointment History
            </h3>
            {patient.appointments.map((appointment, index) => (
              <div key={index} style={appointmentCardStyle}>
                {selectedAppointment?.id === appointment.id ? (
                  <AppointmentDetails
                    appointment={selectedAppointment}
                    onUpdate={handleUpdateAppointment}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4
                        style={{
                          color: "#334155",
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {appointment.title || "Appointment"}
                      </h4>
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        style={{
                          padding: "8px 20px",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "600",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 8px rgba(59, 130, 246, 0.2)",
                        }}
                      >
                        Manage
                      </button>
                    </div>
                    <div style={infoGridStyle}>
                      <div style={infoItemStyle}>
                        <span style={labelStyle}>Appointment Date</span>
                        <span style={valueStyle}>
                          {new Date(appointment.submittedAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={labelStyle}>Status</span>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            backgroundColor:
                              appointment.status === "Complete"
                                ? "#e8f5e9"
                                : "#fff8e1",
                            color:
                              appointment.status === "Complete"
                                ? "#2e7d32"
                                : "#f57c00",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          {appointment.status || "Pending"}
                        </span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={labelStyle}>File attached</span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 16px",
                            backgroundColor: "#f0f7ff",
                            border: "1px solid #e0eaff",
                            borderRadius: "12px",
                            color: "#3b82f6",
                            fontSize: "14px",
                            fontWeight: "500",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <span style={{ fontSize: "18px" }}>📎</span>
                          <span style={{ flex: 1 }}>
                            {appointment.fileName || "No file attached"}
                          </span>
                          {appointment.fileName && appointment.fileData && (
                            <button
                              onClick={() =>
                                handleFileDownload(
                                  appointment.fileData,
                                  "ENTNT Patient - "+appointment.fileName
                                )
                              }
                              style={{
                                padding: "4px 12px",
                                backgroundColor: "#3b82f6",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                ":hover": {
                                  backgroundColor: "#2563eb",
                                },
                              }}
                            >
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                      {appointment.treatment && (
                        <div style={infoItemStyle}>
                          <span style={labelStyle}>Treatment</span>
                          <span style={valueStyle}>
                            {appointment.treatment}
                          </span>
                        </div>
                      )}
                      {appointment.cost && (
                        <div style={infoItemStyle}>
                          <span style={labelStyle}>Cost</span>
                          <span style={{ ...valueStyle, color: "#2e7d32" }}>
                            ₹{appointment.cost}
                          </span>
                        </div>
                      )}
                      {appointment.nextDate && (
                        <div style={infoItemStyle}>
                          <span style={labelStyle}>Next Appointment</span>
                          <span style={valueStyle}>
                            {new Date(appointment.nextDate).toLocaleString(
                              "en-GB"
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    {appointment.message && (
                      <div style={{ marginTop: "10px" }}>
                        <span style={labelStyle}>Message from patient</span>
                        <p
                          style={{
                            ...valueStyle,
                            marginTop: "5px",
                            padding: "12px",
                            backgroundColor: "#f8fafc",
                            borderRadius: "8px",
                          }}
                        >
                          {appointment.message}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsModal;
