import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authTokenKey } from '../configuration';

const PublicRoute = ({children, ...rest}) => {
    return(
        
        <Route {...rest} render={() => 
            sessionStorage.getItem(authTokenKey) ? (
                <Redirect to={{ pathname: '/dashboard'}}/>
                ) : (
                        children
                )}/>
    )
}

export default PublicRoute;