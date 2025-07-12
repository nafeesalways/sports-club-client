import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loader from '../Loader/Loader';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    if(loading){
        return <Loader></Loader>;
    }
    if(!user){
        <Navigate to='/signin'></Navigate>
    }
    return children;
};

export default PrivateRoute;