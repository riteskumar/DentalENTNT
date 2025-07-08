import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const Home = () => {
 const navigate = useNavigate();
   const { isAuthenticated } = useSelector((state) => state.auth);

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const isAdmin =
  currentUser &&
  currentUser.username === "ENTNT Executive" &&
  currentUser.email === "admin" &&
  currentUser.role === "admin";
  // You should move styles to a CSS/SCSS module or TailwindCSS in a real-world app.
  // For now, applying inline styles with better structure and enhancements.

  const styles = {
    container: {
      minHeight: '100vh',
      position: 'relative',
    color: 'white',
    overflow: 'hidden',
    },
    videoBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(30, 58, 138, 0.85)', // Semi-transparent overlay
      zIndex: -1,
    },
    badge: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '8px 16px',
      borderRadius: '20px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '24px'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '80px 20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center'
    },
    leftSection: {
      textAlign: 'left',
    },
    title: {
      fontSize: '48px',
      fontWeight: 800,
      color: 'white',
      marginBottom: '24px',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '18px',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '40px',
      lineHeight: '1.6'
    },
    buttonGroup: {
      display: 'flex',
      gap: '20px',
      marginBottom: '40px'
    },
    primaryButton: {
      padding: '14px 32px',
      backgroundColor: '#10b981',
      color: 'white',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease'
    },
    secondaryButton: {
      padding: '14px 32px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '30px'
    },
    statItem: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    statLabel: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.7)'
    },
    imageSection: {
      position: 'relative'
    },
    mainImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },
    badge1: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      backgroundColor: 'white',
      padding: '12px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    badge2: {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      backgroundColor: 'white',
      padding: '12px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
  };

  return (
    <>
    {
      isAdmin ?(<AdminDashboard/>):(<div style={styles.container}>
      <video
      autoPlay
      loop
      muted
      playsInline
      style={styles.videoBackground}
    >
      <source src="a.mp4" type="video/mp4" />
    </video>
    <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.leftSection}>
          <div style={styles.badge}>
            ✨ Transforming Healthcare Experience
          </div>
          <h1 style={styles.title}>
            Keep Your Teeth Clean
          </h1>
          <p style={styles.subtitle}>
           Discover a brighter, healthier smile with Dental ENTNT. Our expert team combines advanced dental technology with gentle, personalized care—because your confident smile is our top priority.
          </p>
          <div style={styles.buttonGroup}>
            <Link
              to="#"
              style={styles.primaryButton}
              onClick={e => {
                e.preventDefault();
                if (isAuthenticated) {
                  navigate('/appointment');
                } else {
                  navigate('/login');
                }
              }}
            >
              Book an Appointment →
            </Link>


          </div>

        </div>
        <div style={styles.imageSection}>
          <img
            src="/doctor-image.jpg"
            alt="Healthcare Professional"
            style={styles.mainImage}
          />

        </div>
      </div>
    </div>)
    }

    </>
  );
};

export default Home;