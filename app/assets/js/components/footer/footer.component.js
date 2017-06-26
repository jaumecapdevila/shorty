import React from 'react';

class FooterButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.closeApp} className="footer__button">Close
        app</button>
    );
  }
}

export default FooterButton;
