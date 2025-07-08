import { useState } from 'react'

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f0f8ff', 
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  }

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const heroSectionStyle = {
    textAlign: 'center',
    marginBottom: '60px'
  }

  const titleStyle = {
    fontSize: '48px',
    fontWeight: '700',
    color: '#34495e',
    marginBottom: '20px',
    letterSpacing: '-1px'
  }

  const subtitleStyle = {
    fontSize: '20px',
    color: '#7f8c8d',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  }

  const sectionStyle = {
    marginBottom: '60px'
  }

  const sectionTitleStyle = {
    fontSize: '36px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '16px',
    textAlign: 'center'
  }

  const missionBoxStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
    textAlign: 'center',
    marginBottom: '60px',
    transition: 'transform 0.3s ease'
  }

  const missionTextStyle = {
    fontSize: '18px',
    color: '#34495e',
    lineHeight: '1.8',
    maxWidth: '800px',
    margin: '0 auto'
  }

  const highlightStyle = {
    color: '#5dade2',
    fontWeight: '600'
  }

  const decorativeLineStyle = {
    width: '80px',
    height: '4px',
    backgroundColor: '#5dade2',
    margin: '0 auto 40px',
    borderRadius: '2px'
  }

  const statBoxStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  }

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    marginTop: '60px',
    marginBottom: '60px'
  }

  const statNumberStyle = {
    fontSize: '42px',
    fontWeight: '700',
    color: '#5dade2',
    marginBottom: '8px'
  }

  const statLabelStyle = {
    fontSize: '16px',
    color: '#7f8c8d'
  }

  const teamGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    marginTop: '40px'
  }

  const teamCardStyle = {
    backgroundColor: '#ffffff',
    padding: '40px 30px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '2px solid transparent',
    cursor: 'pointer'
  }

  const teamCardHoverStyle = {
    ...teamCardStyle,
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
    borderColor: '#5dade2'
  }

  const iconContainerStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    fontSize: '36px',
    transition: 'transform 0.3s ease'
  }

  const teamTitleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '12px',
    textAlign: 'center'
  }

  const teamDescriptionStyle = {
    fontSize: '16px',
    color: '#7f8c8d',
    lineHeight: '1.6',
    textAlign: 'center'
  }

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Hero */}
        <div style={heroSectionStyle}>
          <h1 style={titleStyle}>About Dental ENTNT</h1>
          <p style={subtitleStyle}>
            Revolutionizing dental care through innovation, compassion, and commitment to your smile.
          </p>
        </div>

        {/* Mission */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Our Mission</h2>
          <div style={decorativeLineStyle}></div>
          <div style={missionBoxStyle}>
            <p style={missionTextStyle}>
              At Dental ENTNT, our goal is to make world-class dental care accessible and stress-free. We use <span style={highlightStyle}>advanced technology</span> and a <span style={highlightStyle}>patient-first approach</span> to deliver customized care and perfect smiles.
            </p>
          </div>
        </div>

        {/* What You Can Do */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>What You Can Do</h2>
          <div style={decorativeLineStyle}></div>
          <div style={teamGridStyle}>
            <div style={teamCardStyle}>
              <div style={{ ...iconContainerStyle, backgroundColor: '#eafaf1', color: '#27ae60' }}>📅</div>
              <h3 style={teamTitleStyle}>Book Appointments</h3>
              <p style={teamDescriptionStyle}>
                Schedule visits online with ease. Choose your preferred time, dentist, and service—no phone calls needed!
              </p>
            </div>
            <div style={teamCardStyle}>
              <div style={{ ...iconContainerStyle, backgroundColor: '#f5eef8', color: '#9b59b6' }}>📊</div>
              <h3 style={teamTitleStyle}>Your Dashboard</h3>
              <p style={teamDescriptionStyle}>
                View your upcoming appointments, treatment history, and personalized care notes—securely and conveniently.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}


        {/* Our Team */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Meet Our Team</h2>
          <div style={decorativeLineStyle}></div>
          <div style={teamGridStyle}>
            {[{
              icon: '👩‍💼',
              bg: '#e8f4fd',
              color: '#3498db',
              title: 'Administrators',
              desc: 'They manage appointments, user accounts, and system operations to keep everything running smoothly.'
            }, {
              icon: '👨‍⚕️',
              bg: '#e8f8f5',
              color: '#2ecc71',
              title: 'Dentists',
              desc: 'Experienced professionals delivering expert diagnosis, treatments, and continuous dental care.'
            }].map((member, index) => (
              <div
                key={index}
                style={hoveredCard === index ? teamCardHoverStyle : teamCardStyle}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{
                  ...iconContainerStyle,
                  backgroundColor: member.bg,
                  color: member.color,
                  transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                }}>
                  {member.icon}
                </div>
                <h3 style={teamTitleStyle}>{member.title}</h3>
                <p style={teamDescriptionStyle}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
