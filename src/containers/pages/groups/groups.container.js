import React from 'react';
import GroupsForm from '../../../components/pages/groups/groups-form.component.js';
import HeaderContainer from '../../header/header.container.js';
import AlreadyExistentException from './exceptions/already-existent-group.exception.js';

const electron = require('electron');
const path = require('path');
const notifier = require('node-notifier');
const fs = require('fs');

class GroupsContainer extends React.Component {
  constructor(props) {
    super(props);
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData');
    this.path = path.join(userDataPath, 'shortcuts.json');
    this.state = {
      groupsList: this.props.groupsList,
      groupName: '',
      errors: [],
      className: 'js-valid',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const groupName = event.target.value;
    const errors = this.validateGroupName(groupName);
    const className = (errors.length === 0) ? 'js-valid' : 'js-invalid';
    this.setState(
      {
        groupName,
        errors,
        className,
      },
    );
  }

  handleClick(event) {
    const errors = this.validateGroupName(this.state.groupName);
    if (errors.length === 0) {
      try {
        if (fs.existsSync(this.path) === false) {
          fs.writeFile(this.path, JSON.stringify([]), 'utf8',
            () => {});
        }
        const currentGroups = JSON.parse(fs.readFileSync(this.path, 'utf8'));
        currentGroups.forEach((group, index) => {
          if (group.name === this.state.groupName) {
            throw new AlreadyExistentException(
              `The group ${this.state.groupName} already exists`);
          }
        });
        const nextId = currentGroups.length + 1;
        const newGroup = {
          id: nextId,
          name: this.state.groupName,
          shortcuts: [],
        };
        currentGroups.push(newGroup);
        fs.writeFile(this.path, JSON.stringify(currentGroups), 'utf8',
          this.showGroupNotification.bind(this));
      } catch (exception) {
        this.setState({
          errors: [
            {
              key: 'group',
              description: exception.getMessage(),
            },
          ],
        });
      }
    }
  }

  validateGroupName(name) {
    const errors = [];
    const regex = new RegExp(/^[a-zA-Z0-9]*$/, 'ig');
    if (name.match(regex) === null) {
      errors.push({
        index: 'regex',
        description: 'Only alphanumerical characters',
      });
    }
    if (name.length > 20) {
      errors.push({
        index: 'length',
        description: 'Max length: 20',
      });
    }
    if (name === '') {
      errors.push({
        index: 'empty',
        description: 'Name can not be empty',
      });
    }
    return errors;
  }

  showGroupNotification() {
    this.setState({ groupName: '' });
    notifier.notify({
      title: 'Shorty',
      message: 'New group added!',
      icon: path.join(__dirname, 'img', 'icon.png'), // Absolute path (doesn't work on balloons)
      sound: false, // Only Notification Center or Windows Toasters
      wait: false, // Wait with callback, until user action is taken against notification
    }, (err, response) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
        <GroupsForm
          groupName={this.state.groupName}
          className={this.state.className}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default GroupsContainer;
