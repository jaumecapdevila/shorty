import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/header/header.component.js';
import EditGroups from '../../components/pages/groups/edit-groups.component.js';
import EditShortcuts from '../../components/pages/shortcuts/edit-shortcuts.component.js';

const electron = require('electron');

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.contentElement = document.getElementById('content');
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeApp = this.closeApp.bind(this);
    this.renderEditGroupsPage = this.renderEditGroupsPage.bind(this);
    this.renderEditShortcutsPage = this.renderEditShortcutsPage.bind(this);
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

  renderEditGroupsPage() {
    ReactDOM.render(<EditGroups />, this.contentElement);
    return null;
  }

  renderEditShortcutsPage() {
    ReactDOM.render(<EditShortcuts />, this.contentElement);
    return null;
  }

  render() {
    return (
      <Header
        navigation={this.state.navigation}
        closeApp={this.closeApp}
        renderEditGroupsPage={this.renderEditGroupsPage}
        renderEditShortcutsPage={this.renderEditShortcutsPage}
      />
    );
  }
}

export default HeaderContainer;
