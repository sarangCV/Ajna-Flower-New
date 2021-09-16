import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

// Importing Routes
import Login from './screens/login';
import Dashboard from './screens/dashboard';
import AddDispatchScreen from './screens/add-dispatch';
import AssignToCustomer from './screens/assign-to-customer';
import AddCustomer from './screens/add-customer';
import Dispatches from './screens/dispatches';
import AddTransport from './screens/add-transport';
import AssignPrice from './screens/assign-price';


// Importing PrivateRoute component
import PrivateRoute from './screens/PrivateRoute'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute path={"/dashboard"}><Dashboard/></PrivateRoute>
                {/* DISPATCH */}
                <PrivateRoute path={"/dispatches"}><Dispatches/></PrivateRoute>
                <PrivateRoute path={"/add-dispatch"}><AddDispatchScreen/></PrivateRoute>
                <PrivateRoute path={"/add-transport"}><AddTransport/></PrivateRoute>
                
                {/* ASSIGN */}
                <PrivateRoute path={"/assign-to-customer/:id"}><AssignToCustomer/></PrivateRoute>
                <PrivateRoute path={"/assign-price/:id/:time"}><AssignPrice/></PrivateRoute>
                <PrivateRoute path={"/add-customer"}><AddCustomer/></PrivateRoute>

            </Switch>
        </BrowserRouter>
    )
}

export default Router
