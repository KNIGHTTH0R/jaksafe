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
import Header from 'components/Header';
import Footer from 'components/Footer';
import {makeSelectCurrentUser, makeSelectIsAuthenticated, makeSelectIsInitialized} from "./selectors";
import {init} from "./actions";

import saga from "./saga";
import AppInitializer from "./AppInitiallizer";

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends Component {

    render() {
        let {isAuthenticated} = this.props;

        return (
            <AppWrapper>
                <Helmet
                    titleTemplate="%s - React.js Boilerplate"
                    defaultTitle="React.js Boilerplate"
                >
                    <meta name="description" content="A React.js Boilerplate application"/>
                </Helmet>
                <Header/>
                <AppInitializer
                    isInitialized={this.props.isInitialized}
                    initialize={this.props.initialize}
                >
                    <Switch>
                        <AuthRoute isAuthenticated={isAuthenticated} exact path="/" component={HomePage}/>
                        <Route exact path="/account/login" component={LoginPage}/>
                        <Route path="/features" component={FeaturePage}/>
                        <Route path="" component={NotFoundPage}/>
                    </Switch>
                </AppInitializer>
                <Footer/>
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

