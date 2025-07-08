import React, { useState, useEffect } from 'react';
import CalendarView from '../components/CalendarView';

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(savedAppointments);
  }, []);
console.log(appointments)

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '40px 20px'
  };

  const contentStyle = {
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const headerStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px 40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    marginBottom: '30px'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h1 style={{ margin: 0, color: '#2c3e50' }}>Appointment Calendar</h1>
        </div>
        <CalendarView appointments={appointments} />
      </div>
    </div>
  );
};

export default Calendar;