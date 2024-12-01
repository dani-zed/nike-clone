import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export function PrivateRoute() {
  const { token } = useAuthStore();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}