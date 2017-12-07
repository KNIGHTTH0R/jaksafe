/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SocialLogin from 'react-social-login'
import styled from 'styled-components';
import socialLoginButtonStyles from './buttonStyles';

const SocialStyledButton = styled.div`${socialLoginButtonStyles}`;

class SocialLoginButton extends Component {
    static propTypes = {
        triggerLogin: PropTypes.func.isRequired,
        // triggerLogout: PropTypes.func.isRequired
    }

    render() {
        const {triggerLogin, triggerLogout, ...buttonProps} = this.props;

        return (
            <SocialStyledButton onClick={triggerLogin} {...buttonProps}>
                {this.props.children}
            </SocialStyledButton>
        );
    }
}

export default SocialLogin(SocialLoginButton);
