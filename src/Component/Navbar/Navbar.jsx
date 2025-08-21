import React, { useState } from 'react';
import './navbar.css';
import closeIcon from '../../Assets/close.jpg';
import gridDot from '../../Assets/gridDot1.png';
import vtulogo from '../../Assets/vtu-logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('navBar');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const showNav = () => setActive('navBar activeNavbar');
  const removeNavbar = () => setActive('navBar');
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin'); // redirect to login
    removeNavbar();
  };

  return (
    <nav className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo" aria-label="VTU Home">
            <img src={vtulogo} alt="VTU Logo" className="logo" />
            <h1 className="logoText">VTU Mysore</h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem"><Link to="/home" className="navLink">Home</Link></li>
            <li className="navItem"><Link to="/about" className="navLink">About</Link></li>
            <li className="navItem"><Link to="/main" className="navLink">Event</Link></li>
            <li className="navItem"><Link to="/gallery" className="navLink">Gallery</Link></li>
            
            <li className="navItem">
              <Link to="/register" className="btn">Register Now</Link>
            </li>
            
          </ul>

          <div onClick={removeNavbar} className="closeNavbar" role="button" aria-label="Close Menu">
            <img src={closeIcon} alt="Close Menu" className="icons" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar" role="button" aria-label="Open Menu">
          <img src={gridDot} alt="Open Menu" className="icon1" />
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
