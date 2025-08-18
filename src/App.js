import React from 'react';
import './app.css';

import Footer from './Component/Footer/Footer';
import Home from './Component/Home/Home';
import Main from './Component/Main/Main';
import Navbar from './Component/Navbar/Navbar';
import Updates from './Component/Updates/Updates';
import About from './Component/About/About';
import Gallery from './Component/Gallery/Gallery';
import Register from './Component/Register/Register';
import AdminLogin from './Component/admin/AdminLogin';
import AdminDashboard from './Component/admin/AdminDashboard';
import ProtectedRoute from './Component/admin/ProtectedRoute';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Navbar />

      {/* Page content below the fixed navbar */}
      <div className="pageContent">
        <Updates />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/main" element={<Main />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<Register />} />
          {/* ✅ Admin Routes */}
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />

        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
