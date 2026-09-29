import React, { useContext } from "react";
import { AppConetxt } from "../../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicOwnerRoute = () => {
  const { owner, loading } = useContext(AppConetxt);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Owner is already logged in
  if (owner) {
    return <Navigate to="/ownerDashbord" replace />;
  }

  // Owner is not logged in
  return <Outlet />;
};

export default PublicOwnerRoute;