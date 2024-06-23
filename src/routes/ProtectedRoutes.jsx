import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ProtectedRoutes = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        toast.info(`Please login to continue`);
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoutes;
