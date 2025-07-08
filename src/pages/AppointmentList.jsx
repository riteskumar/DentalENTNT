import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAppointment } from '../store/appointmentSlice';

const AppointmentList = ({appointments}) => {
  const dispatch = useDispatch();
  const reduxAppointments = useSelector((state) => state?.appointments?.list ?? []);
  const [localAppointments, setLocalAppointments] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setLocalAppointments(savedAppointments);
    savedAppointments.forEach(appointment => {
      if (!reduxAppointments.find(a => a.id === appointment.id)) {
        dispatch(addAppointment(appointment));
      }
    });
  }, []);

  const allAppointments = [...new Map([...reduxAppointments, ...localAppointments]
    .map(item => [item.id, item])).values()];

  // Filter appointments based on status and search term
  const filteredAppointments = allAppointments.filter(appointment => {
    const matchesFilter = selectedFilter === 'all' || appointment.status?.toLowerCase() === selectedFilter;
    const matchesSearch = appointment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
// console.log(filteredAppointments)
  // Calculate stats
  const pendingCount = allAppointments.filter(a => a.status === 'Pending').length;
  const completedCount = allAppointments.filter(a => a.status === 'Completed').length;
  const inProgressCount = allAppointments.filter(a => a.status === 'In Progress').length;

  // Styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isModalOpen ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  };

  const modalCloseButtonStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    border: 'none',
    background: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
  };

  const modalDetailStyle = {
    marginBottom: '15px',
  };

  const modalLabelStyle = {
    fontWeight: '600',
    color: '#666',
    marginBottom: '5px',
  };

  const modalValueStyle = {
    color: '#2c3e50',
    fontSize: '16px',
  };

  // Function to handle opening the modal
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const titleSectionStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '8px',
  };

  const subtitleStyle = {
    color: '#7f8c8d',
    fontSize: '14px',
  };

  const newButtonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  };

  const filterContainerStyle = {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  };

  const filterButtonStyle = {
    padding: '8px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    backgroundColor: 'white',
    color: '#666',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const filterButtonActiveStyle = {
    ...filterButtonStyle,
    backgroundColor: '#3498db',
    color: 'white',
    border: '1px solid #3498db',
  };

  const searchInputStyle = {
    padding: '8px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    width: '250px',
    fontSize: '14px',
    marginLeft: 'auto',
  };
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleSectionStyle}>
          <h1 style={titleStyle}>Patient Appointments</h1>
          <p style={subtitleStyle}>Manage and track patient appointments</p>
        </div>
        {/* <button style={newButtonStyle} >
          🗓️ New Appointment
        </button> */}
      </div>

      {/* Stats Cards */}
      <div style={statsContainerStyle}>
        <div style={statCardStyle}>
          <span style={{ fontSize: '24px' }}>🕒</span>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '600' }}>{pendingCount}</div>
            <div style={{ color: '#666' }}>Pending</div>
          </div>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: '24px' }}>🔄</span>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '600' }}>{inProgressCount}</div>
            <div style={{ color: '#666' }}>In Progress</div>
          </div>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: '24px' }}>✅</span>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '600' }}>{completedCount}</div>
            <div style={{ color: '#666' }}>Completed</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={filterContainerStyle}>
        <button 
          style={selectedFilter === 'all' ? filterButtonActiveStyle : filterButtonStyle}
          onClick={() => setSelectedFilter('all')}
        >
          All Appointments
        </button>
        <button 
          style={selectedFilter === 'pending' ? filterButtonActiveStyle : filterButtonStyle}
          onClick={() => setSelectedFilter('pending')}
        >
          Pending
        </button>
        <button 
          style={selectedFilter === 'in progress' ? filterButtonActiveStyle : filterButtonStyle}
          onClick={() => setSelectedFilter('in progress')}
        >
          In Progress
        </button>
        <button 
          style={selectedFilter === 'completed' ? filterButtonActiveStyle : filterButtonStyle}
          onClick={() => setSelectedFilter('completed')}
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

      {/* Table */}
      {filteredAppointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No appointments found.
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Patient</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Submitted At</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'right', borderBottom: '2px solid #eee' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontWeight: '500' }}>{appointment.name}</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>ID: #{appointment.id}</div>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontWeight: '500' }}>{appointment.submittedAt}</div>
                    {/* <div style={{ color: '#666', fontSize: '14px' }}>ID: #{appointment.id}</div> */}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      backgroundColor: '#e8f4fd',
                      color: '#3498db',
                      fontSize: '14px',
                    }}>
                      {appointment.status || 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'right' }}>
                  <button 
                      onClick={() => handleViewDetails(appointment)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#e8f4fd',
                        color: '#3498db',
                        cursor: 'pointer',
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
      )}
    <div style={modalOverlayStyle} onClick={() => setIsModalOpen(false)}>
        <div style={modalStyle} onClick={e => e.stopPropagation()}>
          <button 
            style={modalCloseButtonStyle}
            onClick={() => setIsModalOpen(false)}
          >
            ×
          </button>
          
          {selectedAppointment && (
            <>
              <h2 style={{ marginBottom: '25px', color: '#2c3e50' }}>
                Appointment Details
              </h2>
              
              <div style={modalDetailStyle}>
                <div style={modalLabelStyle}>Patient Name</div>
                <div style={modalValueStyle}>{selectedAppointment.name}</div>
              </div>

              <div style={modalDetailStyle}>
                <div style={modalLabelStyle}>Email</div>
                <div style={modalValueStyle}>{selectedAppointment.email}</div>
              </div>

              <div style={modalDetailStyle}>
                <div style={modalLabelStyle}>File Uploaded</div>
                <div style={modalValueStyle}>{selectedAppointment.fileName}</div>
              </div>

              <div style={modalDetailStyle}>
                <div style={modalLabelStyle}>Message</div>
                <div style={modalValueStyle}>{selectedAppointment.message || 'No message provided'}</div>
              </div>

              <div style={modalDetailStyle}>
                <div style={modalLabelStyle}>Status</div>
                <div style={modalValueStyle}>{selectedAppointment.status || 'Pending'}</div>
              </div>

              <div style={modalDetailStyle}>
                <div style={modalLabelStyle}>Submitted On</div>
                <div style={modalValueStyle}>{selectedAppointment.submittedAt}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;