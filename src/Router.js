import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

// Importing Routes
import Login from './screens/login';
import Dashboard from './screens/dashboard';
import DispatchScreen from './screens/dispatch';
import AssignToCustomer from './screens/assign-to-customer';
import AddCustomer from './screens/add-customer';


// Importing PrivateRoute component
import PrivateRoute from './screens/PrivateRoute'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute path={"/dashboard"}><Dashboard/></PrivateRoute>
                <PrivateRoute path={"/add-dispatch"}><DispatchScreen/></PrivateRoute>
                <PrivateRoute path={"/assign-to-customer"}><AssignToCustomer/></PrivateRoute>
                <PrivateRoute path={"/add-customer"}><AddCustomer/></PrivateRoute>

            </Switch>
        </BrowserRouter>
    )
}

export default Router
