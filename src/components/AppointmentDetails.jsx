import React, { useState } from 'react';

const AppointmentDetails = ({ appointment, onUpdate }) => {
  const [treatment, setTreatment] = useState(appointment.treatment || '');
  const [cost, setCost] = useState(appointment.cost || '');
  const [status, setStatus] = useState(appointment.status || 'Pending');
  const [nextDate, setNextDate] = useState(appointment.nextDate || '');
  const [files, setFiles] = useState(appointment.files || []);
  const [comments, setComments] = useState(appointment.comments || '');

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...appointment,
      treatment,
      cost,
      status,
      nextDate,
      files,
      comments,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '20px' }}>Appointment Details</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Title</label>
            <input
              type="text"
              value={appointment.title}
              
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Treatment</label>
            <textarea
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              style={{ width: '100%', padding: '8px', minHeight: '100px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={{ width: '100%', padding: '8px', minHeight: '100px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Cost</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Next Appointment</label>
            <input
              type="datetime-local"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Upload Files</label>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          {files.length > 0 && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Uploaded Files</label>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {files.map((file, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Update Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentDetails;