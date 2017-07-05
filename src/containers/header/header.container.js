import React from 'react';
import Header from '../../components/header/header.component.js';

const electron = require('electron');

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.closeApp = this.closeApp.bind(this);
    this.window = electron.remote.getCurrentWindow();
  }

  closeApp() {
    this.window.close();
  }

  render() {
    return (
      <Header
        closeApp={this.closeApp}
      />
    );
  }
}

export default HeaderContainer;
