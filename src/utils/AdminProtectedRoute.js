import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import AuthService from '../services/auth.service';


const AdminProtectedRoute = ({children}) => {
    const user = AuthService.getCurrentUser();
    let location = useLocation();

    if(!user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    else if(user && !user.roles.includes("ROLE_ADMIN")){
        return <Navigate to="/jobs" state={{ from: location }} replace />
    }
 return children

};

export default AdminProtectedRoute;