import React from 'react';
import Home from '../../../components/pages/home/home.component.js';
import HeaderContainer from '../../header/header.container.js';

const electron = require('electron');
const path = require('path');
const fs = require('fs');
const notifier = require('node-notifier');

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData');
    this.path = path.join(userDataPath, 'shortcuts.json');
    this.loadShortcuts = this.loadShortcuts.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.state = {
      groupsList: this.loadGroups(),
      shortcutsList: [],
    };
  }

  loadGroups() {
    try {
      if (fs.existsSync(this.path) === false) {
        fs.writeFile(this.path, JSON.stringify([]), 'utf8',
          () => {});
      }
      return JSON.parse(fs.readFileSync(this.path));
    } catch (error) {
      return {};
    }
  }

  showNotification() {
    notifier.notify({
      title: 'Shorty',
      message: 'Command added to the clipboard!',
      icon: path.join(__dirname, 'img', 'icon.png'), // Absolute path (doesn't work on balloons)
      sound: false, // Only Notification Center or Windows Toasters
      wait: false, // Wait with callback, until user action is taken against notification
    }, (err, response) => {
      console.log(err);
    });
  }

  loadShortcuts(event) {
    const groupName = event.target.value;
    let shortcuts = [];
    Object.keys(this.state.groupsList).forEach((item) => {
      if (this.state.groupsList[item].group === groupName) {
        shortcuts = this.state.groupsList[item].shortcuts;
      }
    });
    this.setState({
      shortcutsList: shortcuts,
    });
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Home
          groupsList={this.state.groupsList}
          shortcutsList={this.state.shortcutsList}
          loadShortcuts={this.loadShortcuts}
          showNotification={this.showNotification}
        />
      </div>
    );
  }
}

export default HomeContainer;
