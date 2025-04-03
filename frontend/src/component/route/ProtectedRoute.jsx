import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return null; // Show nothing while loading

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  else if (isAdmin===true && user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
