import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addAppointment } from '../store/appointmentSlice'; // Import the addAppointment action
import FileUpload from '../components/fileupload';
import { validateForm } from '../utils/formValidation';

const AppointmentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [appointmentDate, setAppointmentDate] = useState('');

  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate(); // Initialize useNavigate
  const handleFileSelect = (data) => {
    setFileData(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = {
      name,
      email,
      phone,
      dob,
      appointmentDate,
    };
    console.log("Form Values:", formValues);
    const validationErrors = validateForm(formValues);
    console.log("Validation Errors:", validationErrors);
    setErrors(validationErrors);


    if (Object.keys(validationErrors).length === 0) {
      const newAppointment = {
        id: Date.now(),
        name,
        phone,
        dob,
        email,
        fileData: fileData?.base64String || null,
        fileName: fileData?.file.name || null,
        message,
        appointmentDate,
        submittedAt: new Date().toLocaleString('en-GB'),
        status: 'Pending' // Add a status field
      };

      try {
        // Dispatch the action to add the appointment
        dispatch(addAppointment(newAppointment));

        // Save to localStorage
        const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));


        navigate('/appointment-success')

        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        setDob('');
        setFile(null);
        setAppointmentDate('');
        setMessage('');

        // Navigate to the appointments list
        // navigate('/dashboard');
      } catch (error) {
        console.error('Error saving appointment:', error);
        alert('There was an error submitting your appointment. Please try again.');
      }
    }
};

  // Inline styles for a clean look
  const errorMessageStyle = {
    color: '#dc2626',
    fontSize: '12px',
    marginTop: '4px',
    fontWeight: '500'
  };
  const formStyles = {
    pageContainer: {
      minHeight: '100vh',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#fff',
      color: '#000',
      borderRadius: '15px',
    },
    section: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '20px',
      color: '#000',
      marginBottom: '20px',
      fontWeight: '600',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#888',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#fff',
      border: '1px solid #333',
      borderRadius: '8px',
      color: '#000',
      fontWeight:500,
      fontSize: '14px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    submitButton: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#00a884',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    checkbox: {
      marginRight: '10px',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      color: '#888',
      fontSize: '14px',
      marginBottom: '10px',
    },
  };
  const validateField = (name, value) => {
    const fieldErrors = {};
    switch (name) {
      case 'name':
        if (!value || !value.trim()) {
          fieldErrors[name] = 'Name is required';
        } else if (value.length < 2) {
          fieldErrors[name] = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value) {
          fieldErrors[name] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          fieldErrors[name] = 'Email format is invalid';
        }
        break;
      case 'phone':
        if (!value) {
          fieldErrors[name] = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
          fieldErrors[name] = 'Please enter a valid 10-digit phone number';
        }
        break;

        case 'dob':
          if (!value) {
            fieldErrors[name] = 'Date of birth is required';
          } else {
            const dobDate = new Date(value);
            const today = new Date();
            if (dobDate > today) {
              fieldErrors[name] = 'Date of birth cannot be in the future';
            }
          }
          break;

          case 'appointmentDate':
            if (!value) {
              fieldErrors[name] = 'Appointment date is required';
            } else {
              const appDate = new Date(value);
              const today = new Date();
              if (appDate < today) {
                fieldErrors[name] = 'Appointment date must be in the future';
              }
            }
            break;
      // Add other field validations...
    }
    return fieldErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the field value
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'dob':
        setDob(value);
        break;
      case 'appointmentDate':
          setAppointmentDate(value);
          break;
      default:
        break;
      // Add other cases...
    }
    const fieldErrors = validateField(name, value);
  setErrors(prev => ({
    ...prev,
    [name]: fieldErrors[name]
  }));
};


  return (
    <div style={formStyles.container}>
    <h1 style={{ color: '#000', marginBottom: '30px' }}>Welcome 👋</h1>

    <form onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div style={formStyles.section}>
        <h2 style={formStyles.sectionTitle}>Personal Information</h2>
        <div style={formStyles.grid}>
          <div style={formStyles.inputGroup}>
            <label style={formStyles.label}>Full Name*</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              style={{
                ...formStyles.input,
                borderColor: errors.name ? '#dc2626' : '#333'
              }}
              required={false}
            />
            {errors.name && <span style={errorMessageStyle}>{errors.name}</span>}
          </div>
          <div style={formStyles.inputGroup}>
            <label style={formStyles.label}>Email Address*</label>
            <input
              type="email"
               name="email"
              value={email}
              onChange={handleInputChange}
              style={{
                ...formStyles.input,
                borderColor: errors.email ? '#dc2626' : '#333'
              }}
            />
            {errors.email && <span style={errorMessageStyle}>{errors.email}</span>}
          </div>
          <div style={formStyles.inputGroup}>
          <label style={formStyles.label}>Phone Number*</label>
          <input
            type="tel"
            value={phone}
            name="phone"
            onChange={handleInputChange}
            style={{
              ...formStyles.input,
              borderColor: errors.phone ? '#dc2626' : '#333'
            }}
            required={false}
          />
          {errors.phone && <span style={errorMessageStyle}>{errors.phone}</span>}
        </div>
        <div style={formStyles.inputGroup}>
          <label style={formStyles.label}>Date of Birth*</label>
          <input
            type="date"
            value={dob}
            name="dob"
            onChange={handleInputChange}
            style={{
              ...formStyles.input,
              borderColor: errors.dob ? '#dc2626' : '#333'
            }}
            max={new Date().toISOString().split('T')[0]}
            required={false}
          />
          {errors.dob && <span style={errorMessageStyle}>{errors.dob}</span>}
        </div>
        </div>
      </div>

      {/* Medical Information */}
      <div style={formStyles.section}>
        <h2 style={formStyles.sectionTitle}>Medical Information</h2>
        <div style={formStyles.grid}>
        <div style={formStyles.inputGroup}>
        <label style={formStyles.label}>Preferred Appointment Date*</label>
        <input
          type="date"
          name="appointmentDate"
          value={appointmentDate}
          onChange={handleInputChange}
          style={{
            ...formStyles.input,
            borderColor: errors.appointmentDate ? '#dc2626' : '#333'
          }}
          min={new Date().toISOString().split('T')[0]}
          required={false}
        />
        {errors.appointmentDate && <span style={errorMessageStyle}>{errors.appointmentDate}</span>}
      </div>
          <div style={formStyles.inputGroup}>
            <label style={formStyles.label}>Medical Concerns</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...formStyles.input, minHeight: '100px' }}
              placeholder="Please describe any medical concerns or specific treatments needed"
            />
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div style={formStyles.section}>
        <h2 style={formStyles.sectionTitle}>Medical Records</h2>
        <FileUpload onFileSelect={handleFileSelect} />
      </div>

      {/* Consent and Privacy */}
      <div style={formStyles.section}>
        <h2 style={formStyles.sectionTitle}>Consent and Privacy</h2>
        <label style={formStyles.checkboxLabel}>
          <input
            type="checkbox"
            required={false}
            style={formStyles.checkbox}
          />
          I consent to receive treatment from my health provider
        </label>
        <label style={formStyles.checkboxLabel}>
          <input
            type="checkbox"
            required={false}
            style={formStyles.checkbox}
          />
          I agree to the use and disclosure of my health information for treatment purposes
        </label>
      </div>

      <button type="submit" style={formStyles.submitButton}>
        Submit Appointment Request
      </button>
    </form>
  </div>
  );
};

export default AppointmentForm;