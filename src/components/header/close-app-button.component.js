import React from 'react';

class CloseAppButton extends React.Component {
  render() {
    return (
      <div
        className="close__button"
        onClick={this.props.toggleMenu}
      ></div>
    );
  }
}

export default CloseAppButton;
