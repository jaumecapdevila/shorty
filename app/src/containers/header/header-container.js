import React from 'react';
import HeaderNavigation from '../../components/header/header-navigation.component.js';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
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

  render() {
    return <HeaderNavigation
      navigation={this.state.navigation}
      toggleMenu={this.toggleMenu}/>;
  }
}

export default HeaderContainer;
