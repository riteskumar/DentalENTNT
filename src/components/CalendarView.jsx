import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = ({ appointments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const calendarContainerStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginBottom: "30px",
  };

  const viewSwitchStyle = {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3498db",
    color: "white",
  };

  const inactiveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f8f9fa",
    color: "#2c3e50",
  };

  const appointmentListStyle = {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  };

  // Filter appointments for selected date
  const getDayAppointments = (date) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);

      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Custom tile content to show appointment count
  const tileContent = ({ date }) => {
    const dayAppointments = getDayAppointments(date);
    return dayAppointments.length > 0 ? (
      <div
        style={{
          fontSize: "0.8em",
          padding: "2px 4px",
          backgroundColor: "#3498db",
          color: "white",
          borderRadius: "10px",
          marginTop: "2px",
        }}
      >
        {dayAppointments.length}
      </div>
    ) : null;
  };

  const selectedDayAppointments = getDayAppointments(selectedDate);
  // console.log("from calendar view ",selectedDayAppointments)
  console.log(appointments);

  return (
    <div style={calendarContainerStyle}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
      />

      {selectedDayAppointments.length > 0 && (
        <div style={appointmentListStyle}>
          <h3>Appointments for {selectedDate.toLocaleDateString("en-GB")}</h3>
          {selectedDayAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              style={{
                padding: "15px",
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              <div style={{ fontWeight: "600" }}>{appointment.name}</div>
              <div style={{ color: "#216", fontSize: "14px",fontWeight: "600" }}>
                Scheduled at: {new Date(appointment.appointmentDate).toLocaleDateString("en-GB")}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>
                Email: {appointment.email}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>
                Phone: +91 {appointment.phone}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>
                Status: {appointment.status}
              </div>
              {appointment.message && (
                <div style={{ marginTop: "5px" }}>Note: {appointment.message}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
