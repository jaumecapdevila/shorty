import React from 'react';
import CloseAppButton from './close-app-button.component.js';
import ActionButtons from './action-buttons.component.js';

class Header extends React.Component {
  render() {
    return (
      <div className="header__container">
        <h1 className="header__title">Shorty</h1>
        <hr className="header__spacer" />
        <CloseAppButton toggleMenu={this.props.closeApp} />
        <ActionButtons renderEditGroupsPage={this.props.renderEditGroupsPage} />
      </div>
    );
  }
}

export default Header;
