import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';

// If the user loggen in then prevent him from navigate to the login page
const LoggedOutRoutes = () => {
  const auth = useSelector(selectAuth);

  return !auth.token ? <Outlet /> : <Navigate to="/" replace />;
};

export default LoggedOutRoutes;
