import React, { useContext } from 'react'
import { AppConetxt } from '../../context/AppContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectOwnerRoyre = () => {
  const { owner, loading } = useContext(AppConetxt);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }
  if (!owner) {
    return <Navigate to="/ownerlogin" replace />
  }
  return <Outlet />
}

export default ProtectOwnerRoyre