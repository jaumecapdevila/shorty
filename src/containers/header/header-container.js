import React from 'react';
import Header from '../../components/header/header.component.js';


const electron = require('electron');

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeApp = this.closeApp.bind(this);
    this.window = electron.remote.getCurrentWindow();
    this.state = {
      navigation: {
        isActive: false,
      },
    };
  }

  toggleMenu() {
    const newState = !this.state.navigation.isActive;
    this.setState({
      navigation: {
        isActive: newState,
      },
    });
  }

  closeApp() {
    this.window.close();
  }

  render() {
    return (
      <Header
        navigation={this.state.navigation}
        closeApp={this.closeApp}
      />
    );
  }
}

export default HeaderContainer;
