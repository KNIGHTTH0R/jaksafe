/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AuthRoute from 'containers/AuthRoute';
import {makeSelectCurrentUser, makeSelectIsAuthenticated, makeSelectIsInitialized} from "./selectors";
import {init} from "./actions";

import saga from "./saga";
import AppInitializer from "./AppInitiallizer";

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  font-family: 'Asap', sans-serif;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

class App extends Component {

    render() {
        let {isAuthenticated} = this.props;

        return (
            <AppWrapper>
                <Helmet
                    titleTemplate="%s - JAKSafe"
                    defaultTitle="JAKSafe"
                >
                    <meta name="description" content="JAKSafe - Untuk Jakarta yang Lebih Aman"/>
                    <link href="https://fonts.googleapis.com/css?family=Asap:400,500,600,700" rel="stylesheet"/>
                </Helmet>
                <AppInitializer
                    isInitialized={this.props.isInitialized}
                    initialize={this.props.initialize}
                >
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/account/login" component={LoginPage}/>
                        <Route path="/features" component={FeaturePage}/>
                        <Route path="" component={NotFoundPage}/>
                    </Switch>
                </AppInitializer>
            </AppWrapper>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
        initialize: () => dispatch(init()),
    };
}

const mapStateToProps = createStructuredSelector({
    isInitialized: makeSelectIsInitialized,
    isAuthenticated: makeSelectIsAuthenticated(),
    currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({key: 'global', saga});

export default compose(
    withSaga,
    withConnect,
)(App);
