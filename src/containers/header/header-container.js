import React from 'react';
import HeaderNavigation from '../../components/header/header-navigation.component.js';

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
      <HeaderNavigation
        navigation={this.state.navigation}
        toggleMenu={this.toggleMenu}
        closeApp={this.closeApp}
      />
    );
  }
}

export default HeaderContainer;
