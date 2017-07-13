import React from 'react';
import ShortcutForm from '../../../components/pages/shortcuts/shortcuts-form.component.js';
import HeaderContainer from '../../header/header.container.js';

const electron = require('electron');
const path = require('path');
const notifier = require('node-notifier');
const fs = require('fs');

class ShortcutsContainer extends React.Component {
  constructor(props) {
    super(props);
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData');
    this.path = path.join(userDataPath, 'shortcuts.json');
    this.state = {
      groups: this.loadGroups(),
      selectedGroup: '',
      shortcut: 'alias:command',
      className: 'js-valid',
      errors: [],
    };
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleShortcutChange = this.handleShortcutChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loadGroups();
  }

  loadGroups() {
    try {
      if (fs.existsSync(this.path) === false) {
        fs.writeFile(this.path, JSON.stringify([]), 'utf8',
          () => {});
      }
      return JSON.parse(fs.readFileSync(this.path));
    } catch (error) {
      return [];
    }
  }

  handleGroupChange(event) {
    const selectedGroup = event.target.value;
    this.setState(
      {
        selectedGroup,
      },
    );
  }

  handleShortcutChange(event) {
    const shortcut = event.target.value;
    const errors = this.validateShortcut(shortcut);
    const className = (errors.length === 0) ? 'js-valid' : 'js-invalid';
    this.setState(
      {
        shortcut,
        errors,
        className,
      },
    );
  }

  handleClick(event) {
    const errors = this.validateShortcut(this.state.shortcut);
    if (errors.length === 0 && this.state.selectedGroup !== '') {
      try {
        if (fs.existsSync(this.path) === false) {
          fs.writeFile(this.path, JSON.stringify([]), 'utf8',
            () => {});
        }
        const currentGroups = JSON.parse(fs.readFileSync(this.path, 'utf8'));
        const splittedShortcut = this.state.shortcut.split(':');
        const alias = splittedShortcut[0];
        const command = splittedShortcut[1];
        const shortcut = {
          alias,
          command,
        };
        currentGroups.forEach((group, index) => {
          if (group.name === this.state.selectedGroup) {
            shortcut.id = group.shortcuts.length + 1;
            group.shortcuts.push(shortcut);
          }
        });
        fs.writeFile(this.path, JSON.stringify(currentGroups), 'utf8',
          this.showShortcutsNotification.bind(this));
      } catch (error) {
        console.log(error);
      }
    }
  }

  showShortcutsNotification() {
    const message = `Shortcut added to the group ${this.state.selectedGroup}`;
    this.setState({ shortcut: '' });
    notifier.notify({
      title: 'Shorty',
      message,
      icon: path.join(__dirname, 'img', 'icon.png'), // Absolute path (doesn't work on balloons)
      sound: false, // Only Notification Center or Windows Toasters
      wait: false, // Wait with callback, until user action is taken against notification
    }, (err, response) => {
    });
  }

  validateShortcut(shortcut) {
    const errors = [];
    if (shortcut.indexOf(':') === -1) {
      errors.push({
        index: 'structure',
        description: 'Pattern alias:command',
      });
      return errors;
    }
    const splittedShortcut = this.state.shortcut.split(':');
    if (splittedShortcut.length !== 2) {
      errors.push({
        index: 'structure',
        description: 'Pattern alias:command',
      });
      return errors;
    }
    const command = splittedShortcut[1];
    if (command.length > 50) {
      errors.push({
        index: 'length',
        description: 'Max command length: 50',
      });
    }
    if (shortcut === '') {
      errors.push({
        index: 'empty',
        description: 'The shortcut can not be empty',
      });
    }
    return errors;
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
        <ShortcutForm
          groups={this.state.groups}
          selectedGroup={this.state.selectedGroup}
          shortcut={this.state.shortcut}
          className={this.state.className}
          errors={this.state.errors}
          handleGroupChange={this.handleGroupChange}
          handleShortcutChange={this.handleShortcutChange}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default ShortcutsContainer;
