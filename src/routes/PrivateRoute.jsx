import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute= ({ allowedRoles }) => {
  const role  = 'user'; // instead desctructure we can go for optional chaining

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

