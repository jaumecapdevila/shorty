import React from 'react';
import NavigationButton from '../../components/header/navigation-button.component.js';

class HeaderNavigation extends React.Component {
  render() {
    return (
      <div className="header__nav">
        <NavigationButton toggleMenu={this.props.toggleMenu} />
        <ol className={`nav__list js-${this.props.navigation.isActive ? 'visible' : 'hidden'}`}>
          <li>New group</li>
          <li>New shortcut</li>
          <li>Close app</li>
        </ol>
      </div>
    );
  }
}

export default HeaderNavigation;
