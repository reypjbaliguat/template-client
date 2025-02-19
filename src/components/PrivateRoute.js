import React from 'react';
import { Navigate } from 'react-router-dom';
import TopNav from './layouts/TopNav';

function PrivateRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? (
        <>
            <TopNav />
            {children}
        </>
    ) : (
        <Navigate to="/login" />
    );
}

export default PrivateRoute;
