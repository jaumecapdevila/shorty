import React from 'react';

class NavigationButton extends React.Component {
  render() {
    return (
      <div
        className="header-menu__button"
        onClick={this.props.toggleMenu}
      ></div>
    );
  }
}

export default NavigationButton;
