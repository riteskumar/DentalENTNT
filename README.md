# DentalENTNT

A modern dental and ENT clinic management web application built with React, Redux Toolkit, and Vite.  
This project provides appointment booking, patient management, admin dashboard, and authentication features.

---

## 🚀 Setup & Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/riteskumar/DentalENTNT.git
   cd DentalENTNT
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the development server**
   ```sh
   npm run dev
   ```

4. **Build for production**
   ```sh
   npm run build
   ```

5. **Preview production build**
   ```sh
   npm run preview
   ```

---

## 🏗️ Project Architecture

```
src/
  components/         # Reusable UI components (PatientForm, PatientTable, PatientDetailsModal, etc.)
  pages/              # Page-level components (Home, About, Dashboard, Patients, etc.)
  store/              # Redux Toolkit slices (authSlice, ProtectedRoute, etc.)
  utils/              # Utility functions (authPersist, autoLogout, etc.)
  App.jsx             # Main app component with routes
  main.jsx            # Entry point
```

- **Routing:** React Router v6, with protected and public-only routes.
- **State Management:** Redux Toolkit (`authSlice` for authentication, user state, and permissions).
- **Persistence:** User authentication state is persisted in `localStorage`.
- **Styling:** Inline styles and CSS modules (if present).

---

## 🔑 Authentication

- **Mock authentication** using hardcoded users in `authSlice.js`.
- **Roles:** `admin` and `patient` with role-based permissions.
- **Auto-logout:** Session expires after a set time (see `autoLogout.js`).

**Default Users:**
- Admin:  
  - Email: `admin@entnt.in`  
  - Password: `admin123`
- Patient:  
  - Email: `john@entnt.in`  
  - Password: `patient123`

---

## 🩺 Features

- **Appointment Booking:** Patients can book appointments via a form.
- **Patient Management:** Admins can view, add, and update patient records.
- **Admin Dashboard:** Role-based access to admin features.
- **Calendar View:** View appointments in a calendar format.
- **Authentication:** Login/logout, protected routes, and permission checks.

---



## 📝 Technical Decisions

- **Redux Toolkit** for scalable and maintainable state management.
- **Role-based permissions** for flexible access control.
- **LocalStorage** for persisting authentication state across sessions.
- **Mock authentication** for rapid prototyping; can be replaced with real API integration.
- **Component structure** follows separation of concerns for maintainability.

---
