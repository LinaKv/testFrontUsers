import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import BigSpinner from '../BigSpinner/BigSpinner';

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <BigSpinner />;
    }

    return loggedIn ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
