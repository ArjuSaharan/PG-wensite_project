import React, { useContext } from 'react'
import { AppConetxt } from '../../context/AppContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedUserRoute = () => {
    const { user, loading } = useContext(AppConetxt);
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Checking authentication...</p>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default ProtectedUserRoute