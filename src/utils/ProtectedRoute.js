import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import AuthService from '../services/auth.service';

const ProtectedRoute = ({children}) => {
    const user = AuthService.getCurrentUser();
    let location = useLocation();

    if(!user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;