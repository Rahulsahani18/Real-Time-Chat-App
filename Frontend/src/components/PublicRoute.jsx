// src/components/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { authUser } = useSelector((state) => state.user);

  if (authUser) {
    return <Navigate to="/HomePage" replace />;
  }

  return children;
};

export default PublicRoute;
