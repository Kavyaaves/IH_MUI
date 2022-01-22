import React, { useContext, useEffect, useState } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider'

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;

};


export default PrivateRoute;
