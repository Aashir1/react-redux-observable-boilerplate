import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import IdScreen from '../Container/IdScreen';
import Home from '../Container/Home';
import Lockers from '../Container/Lockers';
import Products from '../Container/Products';
import AddUser from '../Container/AddUser';
const history = createBrowserHistory();
const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={IdScreen} />
                <Route path="/home" component={Home} />
                <Route path="/lockers" component={Lockers} />
                <Route path="/products" component={Products} />
                <Route path="/addUser" component={AddUser} />
            </Switch>
        </Router>
    )
}

export default Routes;