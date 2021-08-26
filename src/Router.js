import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

// Importing Routes
import Login from './screens/login';
import Dashboard from './screens/dashboard';
import DispatchScreen from './screens/dispatch';


// Importing PrivateRoute component
import PrivateRoute from './screens/PrivateRoute'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute path={"/dashboard"}><Dashboard/></PrivateRoute>
                <PrivateRoute path={"/add-dispatch"}><DispatchScreen/></PrivateRoute>

            </Switch>
        </BrowserRouter>
    )
}

export default Router
