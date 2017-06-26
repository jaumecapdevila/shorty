import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <a href="" onClick={this.props.closeApp()} className="footer__button">Close
          app</a>
      </footer>
    );
  }
}

export default Footer;
