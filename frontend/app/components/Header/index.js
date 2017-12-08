import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import HeaderNav from './HeaderNav';
import HeaderLink from './HeaderLink';
import LogoHeader from './logo-header.svg';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <HeaderNav>
        <HeaderLink to="/">
          <Img src={LogoHeader} alt="JAKSAFE - Logo" />
        </HeaderLink>
      </HeaderNav>
    );
  }
}

export default Header;
