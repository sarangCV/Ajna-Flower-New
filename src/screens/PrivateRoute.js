import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authTokenKey } from '../configuration';

const PrivateRoute = ({children, ...rest}) => {
    return(
        
        <Route {...rest} render={(props) => 
            sessionStorage.getItem(authTokenKey) ? (
                children
                ) : (
                    <Redirect to={{ pathname: '/', state: {from: props.location} }}/>
                )}/>
    )
}

export default PrivateRoute;