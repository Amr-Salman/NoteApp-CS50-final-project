import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';

// If the user not loggen in then navigate to the login page
const ProtectedRoutes = () => {
  const auth = useSelector(selectAuth);

  return auth.token !== '' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
