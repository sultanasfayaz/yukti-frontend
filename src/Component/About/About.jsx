import React from 'react';
import './about.css';
import vtulogo from '../../Assets/vtu-logo.png'; // Make sure this path is correct

const About = () => {
  return (
    <section className="about section">
      <div className="container">
        <div className="aboutContent">
          <div className="logoSection">
            <img src={vtulogo} alt="VTU Logo" className="vtuLogo" />
            <div className="gradient-border">
              <h1>About Yukti</h1>
            </div>
    
          </div>

          <p>
            <strong>Yukti</strong> is the annual inter-collegiate fest organized by
            Visvesvaraya Technological University (VTU) - Mysuru Regional Center.
            It celebrates creativity, innovation, and talent through a diverse
            range of events including cultural programs, technical competitions,
            arts, and more.
          </p>

          <p>
            The fest provides a dynamic platform for students from various colleges
            to showcase their skills, connect with peers, and engage in healthy
            competition. Yukti brings together the spirit of learning and fun,
            offering memorable experiences and lifelong friendships.
          </p>

          <p>
            Come be a part of <strong>Yukti</strong> and witness the vibrant energy,
            intellect, and talent of Karnataka's finest students!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
