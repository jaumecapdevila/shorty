import React from 'react';
import ShortcutsList from '../../components/content/shortcuts-list.component.js';

const electron = require('electron');
const path = require('path');
const fs = require('fs');

class ShortCutsListContainer extends React.Component {
  constructor(props) {
    super(props);
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData');
    this.path = path.join(userDataPath, 'shortcuts.json');
    this.loadShortcuts = this.loadShortcuts.bind(this);
    this.state = {
      groupsList: this.loadGroups(),
      shortcutsList: [],
    };
  }

  loadGroups() {
    try {
      return JSON.parse(fs.readFileSync(this.path));
    } catch (error) {
      console.log(error);
      return {};
    }
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
      <ShortcutsList
        groupsList={this.state.groupsList}
        shortcutsList={this.state.shortcutsList}
        loadShortcuts={this.loadShortcuts}
      />
    );
  }
}

export default ShortCutsListContainer;
