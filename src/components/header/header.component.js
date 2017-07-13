import React from 'react';
import { Link } from 'react-router-dom';
import CloseAppButton from './close-app-button.component.js';
import NavigationButtons from './navigation-buttons.component.js';

class Header extends React.Component {
  render() {
    return (
      <div className="header__container">
        <h1 className="header__title"><Link to="/">Shorty</Link></h1>
        <hr className="header__spacer"/>
        <CloseAppButton toggleMenu={this.props.closeApp}/>
        <NavigationButtons/>
      </div>
    );
  }
}

export default Header;
