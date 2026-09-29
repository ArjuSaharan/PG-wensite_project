import React, { useContext } from "react";
import { AppConetxt } from "../../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicUserRoute = () => {
  const { user, loading } = useContext(AppConetxt);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // User is already logged in
  if (user) {
    return <Navigate to="/user" replace />;
  }

  // User is not logged in
  return <Outlet />;
};

export default PublicUserRoute;