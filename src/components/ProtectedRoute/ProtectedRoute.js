import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props}) => {
    
    return (
        <Route>
            {
               localStorage.getItem('token') ? <Component {...props}/> : <Redirect to="/signin"/>
            }

        </Route>
    )
}

export default ProtectedRoute;