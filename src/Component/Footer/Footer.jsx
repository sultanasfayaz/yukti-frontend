import React from 'react';
import './footer.css';
import video2 from '../../Assets/yuktivideo.mp4';
import linkedinIcon from '../../Assets/vtu-logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="videoBackground">
        <video src={video2} loop autoPlay muted type="video/mp4" />
        <div className="overlay"></div>
      </div>

      <div className="footerContent">
        <div className="footerText">
          <h2>YUKTI 2K25</h2>
          <p>A Regional Level Techno-Cultural Fest</p>
          <p>Organized by VTU Mysuru Regional Center</p>
        </div>

        <div className="footerBottom">
          <p>© {new Date().getFullYear()} VTU Mysore. All Rights Reserved.</p>
          <p>
            Developed by{' '}
            <a href="https://your-profile-link.com" target="_blank" rel="noopener noreferrer" className="developer-link">
              Sultana S F(4VZ23MC110) <img src={linkedinIcon} alt="profile" className="dev-icon" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
