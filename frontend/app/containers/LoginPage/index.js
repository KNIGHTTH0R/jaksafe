/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
// import messages from './messages';
import { loginFacebook, loginFacebookSuccess, loginFacebookError } from '../App/actions';
// import { changeUsername } from './actions';
// import { makeSelectUsername } from './selectors';
import SocialLoginButton from 'components/SocialLoginButton';

import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor (props) {
        super(props)

        this.nodes = {};
    }

    /**
     * when initial state username is not null, submit the form to load repos
     */
    componentDidMount() {
        // if (this.props.username && this.props.username.trim().length > 0) {
        //   this.props.onSubmitForm();
        // }
    }

    setNodeRef (provider, node) {
        if (node) {
            this.nodes[ provider ] = node
        }
    }

    //
    // handleSocialLogin = (user) => {
    //     console.log('hai');
    //     console.log(user);
    // };
    //
    // handleSocialLoginFailure = (error) => {
    //     console.log('hai gagal');
    //     console.error(error);
    // };

    render() {
        const {loading, error, repos} = this.props;
        // const reposListProps = {
        //   loading,
        //   error,
        //   repos,
        // };

        return (
            <article>
                <Helmet>
                    <title>Login</title>
                    <meta name="description" content="Jaksafe Login Page"/>
                </Helmet>
                <div>
                    <SocialLoginButton
                        provider='facebook'
                        appId='153285791973138'
                        onLoginSuccess={this.props.onLoginSuccess}
                        onLoginFailure={this.props.onLoginError}
                        getInstance={this.setNodeRef.bind(this, 'facebook')}
                    >
                        Login with Facebook
                    </SocialLoginButton>
                </div>
            </article>
        );
    }
}

LoginPage.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    repos: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
    ]),
    onSubmitForm: PropTypes.func,
    username: PropTypes.string,
    onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        login: (evt) => dispatch(loginFacebook()),
        onLoginSuccess: (user) => dispatch(loginFacebookSuccess(user)),
        onLoginError: (error) => dispatch(loginFacebookError(error)),
        // onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
        // onSubmitForm: (evt) => {
        //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        //   dispatch(loadRepos());
        // },
    };
}

const mapStateToProps = createStructuredSelector({
    // repos: makeSelectRepos(),
    // username: makeSelectUsername(),
    // loading: makeSelectLoading(),
    // error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'login', reducer});
const withSaga = injectSaga({key: 'login', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(LoginPage);
