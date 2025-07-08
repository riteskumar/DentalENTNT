import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PatientForm from "../components/PatientForm.jsx";
import PatientTable from "../components/PatientTable.jsx";


import PatientDetailsModal from "../components/patientdetailsmodal.jsx";
const Patients = () => {
  const { user } = useSelector((state) => state.auth);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const handleView = (patient) => {
    const patientWithAppointments = {
      ...patient,
      appointments: appointments.filter(
        (a) => a.email.toLowerCase() === patient.email.toLowerCase()
      ),
    };
    setSelectedPatient(patientWithAppointments);
    setShowModal(true);
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    // Update appointments in localStorage
    const updatedAppointments = appointments.map((app) =>
      app.id === updatedAppointment.id ? updatedAppointment : app
    );
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setPatients(
      patients.map((patient) => {
        if (
          patient.email.toLowerCase() === updatedAppointment.email.toLowerCase()
        ) {
          return {
            ...patient,
            appointments: patient.appointments.map((app) =>
              app.id === updatedAppointment.id ? updatedAppointment : app
            ),
          };
        }
        return patient;
      })
    );
  };
  const handleAdd = (patientData) => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const appointmentId = `AP${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const patientId = `PT${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const newAppointment = {
      id: appointmentId,
      name: patientData.name,
      email: patientData.email,
      phone: patientData.phone,
      dob: patientData.dob,
      submittedAt: new Date().toISOString(),
      status: patientData.status,
      message: patientData.message || "",
    };

    // Find if patient already exists
    const existingPatient = patients.find(
      (p) => p.email.toLowerCase() === patientData.email.toLowerCase()
    );

    if (existingPatient) {
      // Update existing patient
      const updatedPatients = patients.map((p) => {
        if (p.email.toLowerCase() === patientData.email.toLowerCase()) {
          return {
            ...p,
            appointments: [...p.appointments, newAppointment],
            status: patientData.status,
          };
        }
        return p;
      });
      setPatients(updatedPatients);
    } else {
      // Create new patient
      const newPatient = {
        id: patientId,
        name: patientData.name,
        email: patientData.email,
        phone: patientData.phone,
        dob: patientData.dob,
        status: patientData.status,
        appointments: [newAppointment],
      };
      setPatients([...patients, newPatient]);
    }

    // Update appointments in localStorage
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setShowForm(false);
  };

  useEffect(() => {
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    // Create a Map to store unique patients by email
    // const uniquePatientsMap = new Map();
    const patientMap = new Map();

    savedAppointments.forEach((appointment) => {
      const email = appointment.email.toLowerCase();

      if (!patientMap.has(email)) {
        // Create new patient with their first appointment
        patientMap.set(email, {
          id: `PT${Date.now()}${Math.floor(Math.random() * 1000)}`, // Unique patient ID
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          dob: appointment.dob,
          status: appointment.status,
          appointments: [appointment], // Array of appointments
        });
      } else {
        // Add appointment to existing patient
        const patient = patientMap.get(email);
        patient.appointments.push(appointment);

        // Update patient status based on most recent appointment
        const sortedAppointments = patient.appointments.sort(
          (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
        );
        patient.status = sortedAppointments[0].status;
      }
    });

    // Convert Map values to array and update state
    const uniquePatients = Array.from(patientMap.values());
    setPatients(uniquePatients);
    setAppointments(savedAppointments);
  }, []);

  // Simple patient data

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    padding: "40px 20px",
  };

  const contentStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const headerStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px 40px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleSectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: 0,
    letterSpacing: "-1px",
  };

  const subtitleStyle = {
    fontSize: "16px",
    color: "#7f8c8d",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const userBadgeStyle = {
    display: "inline-block",
    backgroundColor: "#e8f4fd",
    color: "#3498db",
    padding: "4px 12px",
    borderRadius: "16px",
    fontSize: "14px",
    fontWeight: "600",
  };

  const addButtonStyle = {
    padding: "14px 28px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 12px rgba(39, 174, 96, 0.2)",
  };

  const addButtonHoverStyle = {
    ...addButtonStyle,
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(39, 174, 96, 0.3)",
  };

  const tableContainerStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginBottom: "30px",
    overflow: "hidden",
  };

  const statsStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "20px 30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  };

  const statItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  };

  const statIconStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  };

  const statTextStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const statValueStyle = {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2c3e50",
  };

  const statLabelStyle = {
    fontSize: "14px",
    color: "#7f8c8d",
  };

  // Add new patient

  // Edit patient
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };
  // console.log(patients)
  // Update patient
  const handleUpdate = (patientData) => {
    const updatedPatients = patients.map((p) =>
      p.id.toString() === editingPatient.id.toString()
        ? { ...patientData, id: editingPatient.id }
        : p
    );
    setPatients(updatedPatients);
    const updatedAppointments = appointments.map((app) => {
      if (app.email.toLowerCase() === patientData.email.toLowerCase()) {
        return {
          ...app,
          name: patientData.name,
          email: patientData.email,
          phone: patientData.phone,
          dob: patientData.dob,
          status: patientData.status,
        };
      }
      return app;
    });
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setShowForm(false);
    setEditingPatient(null);
  };
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, patientId: null });
  // Delete patient
  const handleDelete = (id) => {
    setDeleteConfirmation({ show: true, patientId: id });
  };
  const confirmDelete = () => {
    const id = deleteConfirmation.patientId;
    const patientToDelete = patients.find(p => p.id === id);

    const updatedPatients = patients.filter(p => p.id !== id);
    setPatients(updatedPatients);

    const updatedAppointments = appointments.filter(app =>
      app.email.toLowerCase() !== patientToDelete.email.toLowerCase()
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    setDeleteConfirmation({ show: false, patientId: null });
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  // Calculate stats
  const activeCount = patients.filter((p) => p.status === "Active").length;
  const completeCount = patients.filter((p) => p.status === "Complete").length;
  const pendingCount = patients.filter((p) => p.status === "Pending").length;

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={titleSectionStyle}>
            <h1 style={titleStyle}>Patient Management</h1>
            <p style={subtitleStyle}>
              Logged in as: <strong>{user?.name}</strong>
              <span style={userBadgeStyle}>{user?.role}</span>
            </p>
          </div>
          {user?.permissions?.includes("edit_patients") && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={hoveredButton ? addButtonHoverStyle : addButtonStyle}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              <span style={{ fontSize: "20px" }}>+</span>
              Add New Patient
            </button>
          )}
        </div>

        {/* Stats Footer */}
        <div style={statsStyle}>
          <div style={statItemStyle}>
            <div
              style={{
                ...statIconStyle,
                backgroundColor: "#e8f4fd",
                color: "#3498db",
              }}
            >
              👥
            </div>
            <div style={statTextStyle}>
              <span style={statValueStyle}>{patients.length}</span>
              <span style={statLabelStyle}>Total Patients</span>
            </div>
          </div>

          <div style={statItemStyle}>
            <div
              style={{
                ...statIconStyle,
                backgroundColor: "#e8f8f5",
                color: "#27ae60",
              }}
            >
              ✅
            </div>
            <div style={statTextStyle}>
              <span style={statValueStyle}>{activeCount}</span>
              <span style={statLabelStyle}>Active</span>
            </div>
          </div>

          <div style={statItemStyle}>
            <div
              style={{
                ...statIconStyle,
                backgroundColor: "#e8f4fd",
                color: "#3498db",
              }}
            >
              🏁
            </div>
            <div style={statTextStyle}>
              <span style={statValueStyle}>{completeCount}</span>
              <span style={statLabelStyle}>Complete</span>
            </div>
          </div>

          <div style={statItemStyle}>
            <div
              style={{
                ...statIconStyle,
                backgroundColor: "#fef5e7",
                color: "#f39c12",
              }}
            >
              ⏳
            </div>
            <div style={statTextStyle}>
              <span style={statValueStyle}>{pendingCount}</span>
              <span style={statLabelStyle}>Pending</span>
            </div>
          </div>
        </div>

        {/* Form (Add or Edit) */}
        {showForm && (
          <div style={{ marginBottom: "30px" }}>
            <PatientForm
              patient={editingPatient}
              onSave={editingPatient ? handleUpdate : handleAdd}
              onCancel={handleCancel}
            />
          </div>
        )}
        {deleteConfirmation.show && (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        animation: 'modalFadeIn 0.3s ease-out'
      }}>
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>⚠️</div>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#2c3e50',
          fontSize: '20px'
        }}>
          Delete Patient
        </h3>
        <p style={{
          margin: '0 0 25px 0',
          color: '#64748b',
          fontSize: '15px'
        }}>
          Are you sure you want to delete this patient? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => setDeleteConfirmation({ show: false, patientId: null })}
            style={{
              padding: '10px 20px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: 'white',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#ef4444',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )}

        {/* Table */}
        <div style={tableContainerStyle}>
          <PatientTable
            patients={patients}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onUpdateAppointment={handleUpdateAppointment}
          />
        </div>
        {showModal && selectedPatient && (
          <PatientDetailsModal
            patient={selectedPatient}
            onClose={() => {
              setShowModal(false);
              setSelectedPatient(null);
            }}
            onUpdateAppointment={handleUpdateAppointment}
          />
        )}
      </div>
    </div>
  );
};

export default Patients;
