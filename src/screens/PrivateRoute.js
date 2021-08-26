import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
    return(
        <Route {...rest} render={() => (children)}/>
    )
}

export default PrivateRoute;