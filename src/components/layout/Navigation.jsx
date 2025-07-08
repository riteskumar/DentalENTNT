import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";

const Navigation = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  if (location.pathname === '/login') {
    return null;
  }
  const handleLogout = () => {
    // localStorage.removeItem('currentUser');
    dispatch(logout());
    navigate("/login");
  };

  // Styles
  const navStyle = {
    backgroundColor: "#f8f9fa",
    padding: "15px 40px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const navContainerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    fontSize: "22px",
    fontWeight: "600",
    color: "#667eea",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  };

  const linkStyle = {
    color: "#64748b",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.2s ease",
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: "#667eea",
    backgroundColor: "#f0f3ff",
  };

  const hoveredLinkStyle = {
    ...linkStyle,
    color: "#667eea",
    backgroundColor: "#f0f3ff",
    transform: "translateY(-1px)",
  };

  const userSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const userInfoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginRight: "12px",
    padding: "8px 16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "50px",
    border: "2px solid #e9ecef",
  };

  const userNameStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2c3e50",
  };

  const roleBadgeStyle = {
    backgroundColor: "#667eea",
    color: "white",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const logoutButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#fee",
    color: "#e74c3c",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const logoutButtonHoverStyle = {
    ...logoutButtonStyle,
    backgroundColor: "#e74c3c",
    color: "white",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(231, 76, 60, 0.3)",
  };

  const loginButtonStyle = {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "inline-block",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  };

  const loginButtonHoverStyle = {
    ...loginButtonStyle,
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
  };

  const separatorStyle = {
    width: "1px",
    height: "24px",
    backgroundColor: "#e9ecef",
    margin: "0 8px",
  };
  const appointmentButtonStyle = {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
    color: "white",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(0, 210, 255, 0.3)",
    animation: "pulse 2s infinite",
  };
  const appointmentButtonHoverStyle = {
    ...appointmentButtonStyle,
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 210, 255, 0.4)",
  };
  // Check if link is active
  const isActive = (path) => location.pathname === path;

  // Get navigation items based on role
  const getNavItems = () => {
    const commonItems = [{ path: "/about", label: "About" }];

    if (!isAuthenticated) return commonItems;

    const authenticatedItems = [
      { path: "/dashboard", label: "Your Dashboard" },
    ];

    const roleSpecificItems = {
      admin: [
        { path: "/patients", label: "Patients Management" },
        { path: "/calendar", label: "Calendar" },
      ],
    };

    const userRoleItems = roleSpecificItems[user?.role] || [];

    return [...authenticatedItems, ...commonItems, ...userRoleItems];
  };

  return (
    <nav style={navStyle}>
      <div style={navContainerStyle}>
        <Link to="/" style={logoStyle}>
          <img
            src="/icons8-dentist-32.png"
            alt="ENTNT"
            style={{ height: "32px" }}
          />
          Dental ENTNT
        </Link>


        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {getNavItems().map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={
                item.label === "Book an appointment"
                  ? hoveredLink === item.path
                    ? appointmentButtonHoverStyle
                    : appointmentButtonStyle
                  : isActive(item.path)
                  ? activeLinkStyle
                  : hoveredLink === item.path
                  ? hoveredLinkStyle
                  : linkStyle
              }
              onMouseEnter={() => setHoveredLink(item.path)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {item.label === "Book an appointment"
                ? "📅 " + item.label
                : item.label}
            </Link>

          ))}
          <div style={userInfoStyle}>
                <span style={userNameStyle}>👋 Hello {user?.username}</span>
                <span style={roleBadgeStyle}>{user?.role}</span>
              </div>
          {isAuthenticated ? (
            <>

              <button
                onClick={handleLogout}
                style={
                  hoveredButton === "logout"
                    ? logoutButtonHoverStyle
                    : logoutButtonStyle
                }
                onMouseEnter={() => setHoveredButton("logout")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span style={{ fontSize: "16px" }}>↪</span>
                Logout

              </button>

            </>
          ) : (
            <Link
              to="/login"
              style={
                hoveredButton === "login"
                  ? loginButtonHoverStyle
                  : loginButtonStyle
              }
              onMouseEnter={() => setHoveredButton("login")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
