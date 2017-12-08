import React, { Component } from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom'

class AuthRoute extends Component {

    constructor() {
        super();

        this.renderRoute = this.renderRoute.bind(this);
    }

    render() {
        let { isAuthenticated, ...props } = this.props;
        return <Route {...props} component={this.renderRoute} />;
    }

    renderRoute(props) {
        let { component: Component, isAuthenticated } = this.props;
        return !!isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
    }
}

export default AuthRoute;
