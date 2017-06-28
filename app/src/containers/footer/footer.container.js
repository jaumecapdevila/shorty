import React from 'react';
import FooterButton from '../../components/footer/footer.component.js';

const electron = require('electron');

class FooterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.closeApp = this.closeApp.bind(this);
    this.window = electron.remote.getCurrentWindow();
  }

  closeApp() {
    this.window.close();
  }

  render() {
    return <FooterButton closeApp={this.closeApp} />;
  }
}

export default FooterContainer;
