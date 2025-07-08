import React from "react";
import { jsPDF } from "jspdf";
import { Link, useNavigate } from "react-router-dom";

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ecfdf5", // Soft green pastel
  padding: "20px",
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: "20px",
  padding: "40px 32px",
  boxShadow: "0 12px 32px rgba(16, 185, 129, 0.15)",
  textAlign: "center",
  maxWidth: "500px",
  width: "100%",
  animation: "fadeIn 0.6s ease-in-out",
};

const gifStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
  marginBottom: "24px",
  borderRadius: "12px",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "700",
  color: "#10b981", // Emerald green
  marginBottom: "16px",
};

const backButtonStyle = {
  marginTop: "32px",
  background: "#f1f5f9",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  padding: "12px 32px",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
  transition: "background 0.2s, color 0.2s",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};
const subtitleStyle = {
  fontSize: "1.1rem",
  color: "#334155",
  lineHeight: "1.6",
};
const actionLinksStyle = {
  display: "flex",
  gap: "22px",
  justifyContent: "center",
  marginTop: "28px",
};

const linkButtonStyle = {
  color: "#fff",
  padding: "15px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "1rem",
  boxShadow: "0 2px 8px rgba(16,185,129,0.10)",
  transition: "background 0.2s, transform 0.1s",
  border: "none",
  outline: "none",
  cursor: "pointer",
  display: "inline-block",
};
const newAppointmentButtonStyle = {
  ...linkButtonStyle,
  background: "#10b981", // Emerald green
};
const downloadButtonStyle = {
  ...linkButtonStyle,
  background: "#2563eb",
};

const styleTag = `
@keyframes fadeIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
`;

const AppointmentSuccess = () => {
  const navigate = useNavigate();
  const getLatestAppointment = () => {
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    return appointments.length > 0
      ? appointments[appointments.length - 1]
      : null;
  };

  const handleDownloadPDF = () => {
    const appointment = getLatestAppointment();
    if (!appointment) return;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Dental ENTNT Hospital", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Appointment Slip", 105, 32, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(20, 36, 190, 36);

    doc.setFontSize(12);
    let y = 48;
    doc.text(`Patient Name: ${appointment.name || ""}`, 20, y);
    y += 10;
    doc.text(`Email: ${appointment.email || ""}`, 20, y);
    y += 10;
    doc.text(`Phone: +91 ${appointment.phone || ""}`, 20, y);
    y += 10;
    doc.text(
      `Date & Time: ${new Date(appointment.appointmentDate).toLocaleString(
        "en-GB"
      )}`,
      20,
      y
    );
    y += 10;
    if (appointment.message) {
      doc.text(`Message: ${appointment.message}`, 20, y);
      y += 10;
    }

    doc.setFont("helvetica", "bold");
    doc.text("Advice:", 20, y);
    y += 10;
    doc.setDrawColor(0);

    doc.save("appointment.pdf");
  };
  return (
    <>
      <style>{styleTag}</style>
      <div style={containerStyle}>
        <div style={cardStyle}>
          <img src="/success3.gif" alt="Success" style={gifStyle} />
          <div style={titleStyle}>Appointment Booked!</div>
          <div style={subtitleStyle}>
            Thank you for booking with us. <br />
            One of our team members will contact you shortly to confirm your
            appointment. <br />
            We look forward to seeing you!
          </div>
          <div style={actionLinksStyle}>
            <Link to="/appointment" style={newAppointmentButtonStyle}>
              New Appointment
            </Link>
            <button style={downloadButtonStyle} onClick={handleDownloadPDF}>
              Download appointment
            </button>
          </div>
          <button style={backButtonStyle} onClick={() => navigate("/")}>
            ← Return to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default AppointmentSuccess;
