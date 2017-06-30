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
    this.state = {
      groupsList: this.loadGroups(),
      shortcutsList: [
        {
          description: 'Description',
          command: 'test command',
        },
      ],
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

  render() {
    return (
      <ShortcutsList
        groupsList={this.state.groupsList}
        shortcutsList={this.state.shortcutsList}
      />
    );
  }
}

export default ShortCutsListContainer;
