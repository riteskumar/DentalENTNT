import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin =
    currentUser &&
    currentUser.username === "ENTNT Executive" &&
    currentUser.email === "admin" &&
    currentUser.role === "admin";

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // Redirect non-admins
    }
  }, [isAdmin, navigate]);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #2563eb 0%, #1e293b 100%)",
      color: "#fff",
      padding: "40px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      background: "#fff",
      color: "#1e293b",
      borderRadius: "18px",
      boxShadow: "0 8px 32px rgba(30,41,59,0.18)",
      padding: "36px 48px",
      maxWidth: "1400px",
      width: "100%",
      marginTop: "5px",
      textAlign: "center",
    },
    button: {
      background: "linear-gradient(90deg, #10b981 0%, #2563eb 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "30px",
      padding: "18px 40px",
      fontWeight: 700,
      fontSize: "1.2rem",
      cursor: "pointer",
      boxShadow: "0 4px 16px rgba(37,99,235,0.15)",
      marginTop: "32px",
      transition: "transform 0.1s, box-shadow 0.1s",
      letterSpacing: "1px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: 800,
      marginBottom: "18px",
      color: "#2563eb",
    },
    subtitle: {
      fontSize: "1.2rem",
      marginBottom: "32px",
      color: "#334155",
    },
    stats: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "32px",
      gap: "24px",
    },
    statBox: {
      background: "#f1f5f9",
      borderRadius: "12px",
      padding: "18px 24px",
      minWidth: "100px",
      flex: 1,
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#2563eb",
    },
    statLabel: {
      fontSize: "1rem",
      color: "#64748b",
    },
    actions: {
      marginTop: "24px",
      display: "flex",
      margin: "auto",
      gap: "100px",
    },
    actionBtn: {
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "20px 10px",
      fontWeight: 600,
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    adminBadge: {
      display: "inline-block",
      background: "#10b981",
      color: "#fff",
      borderRadius: "20px",
      padding: "6px 18px",
      fontWeight: 700,
      marginBottom: "18px",
      fontSize: "1rem",
      letterSpacing: "1px",
    },
  };

  // Dummy stats for illustration
  const stats = [
    { label: "Total Patients", value: 120 },
    { label: "Appointments", value: 45 },
    { label: "Doctors", value: 8 },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.adminBadge}>Admin Panel</div>
        <div style={styles.title}>Welcome, {currentUser?.username}!</div>
        
        <div>

          <button style={styles.button}  onClick={() => navigate("/dashboard")}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>

Go to dashboard

          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
