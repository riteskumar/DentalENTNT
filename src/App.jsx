import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initializeAuth } from "./utils/authPersist.js";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AppointmentSuccess from "./pages/AppointmentSuccess.jsx";
import Navigation from "./components/layout/Navigation.jsx";
import ProtectedRoute from "./store/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Patients from "./pages/Patients.jsx";
import NotFound from "./pages/NotFound.jsx";
import AppointmentForm from "./pages/appointmentform.jsx";
import AppointmentList from "./pages/appointmentlist.jsx";
import Calendar from "./pages/Calendar.jsx";

function App() {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <div>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/appointments-list" element={<AppointmentList />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/appointment-success" element={<AppointmentSuccess />} />

          <Route
            path="/patients"
            element={
              <ProtectedRoute requiredPermissions={["view_patients"]}>
                <Patients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute requiredPermissions={["view_patients"]}>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
