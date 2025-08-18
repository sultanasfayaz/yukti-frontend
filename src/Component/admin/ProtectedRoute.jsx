import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem('adminToken');
  return token ? Component : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
