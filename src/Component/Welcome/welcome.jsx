import React from "react";
import "./welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-overlay">
        <div className="welcome-content">
          <h1>Welcome to <span>Yukti Web Portal</span></h1>
          <p>
            A platform to celebrate talent, creativity, and innovation.  
            Register now and be part of VTU Mysore’s biggest fest!
          </p>
          <div className="welcome-buttons">
            <Link to="/register" className="btn-primary">Register Now</Link>
            <Link to="/about" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
