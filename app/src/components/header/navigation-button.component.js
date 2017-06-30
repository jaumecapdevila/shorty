import React from 'react';

class NavigationButton extends React.Component {
  render() {
    return (
      <button
        className="header-menu__button"
        onClick={this.props.toggleMenu}
      >
        Menu
      </button>
    );
  }
}

export default NavigationButton;
