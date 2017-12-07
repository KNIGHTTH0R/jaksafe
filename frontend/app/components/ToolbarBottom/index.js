import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ToolbarButton from './ToolbarButton';

const ToolbarWrapper = styled.div`
  background-color: #DCDCDC;
  margin: 0 auto;
  display: flex;
  padding: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 64px;
`;

const ToolbarLabel = styled.span`
  display: block;
`;

class ToolbarBottom extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ToolbarWrapper>
        <ToolbarButton to="/">
          <i className="fa fa-map-marker" aria-hidden="true"></i>
          <ToolbarLabel>Live Map</ToolbarLabel>
        </ToolbarButton>
        <ToolbarButton to="/directory">
          <i className="fa fa-list-alt" aria-hidden="true"></i>
          <ToolbarLabel>Directory</ToolbarLabel>
        </ToolbarButton>
        <ToolbarButton to="/leaderboard">
          <i className="fa fa-trophy" aria-hidden="true"></i>
          <ToolbarLabel>Leaderboard</ToolbarLabel>
        </ToolbarButton>
        <ToolbarButton to="/user">
          <i className="fa fa-user" aria-hidden="true"></i>
          <ToolbarLabel>User</ToolbarLabel>
        </ToolbarButton>
      </ToolbarWrapper>
    );
  }
}

export default ToolbarBottom;
