import React from 'react';
import GroupsForm from '../../../components/pages/groups/groups-form.component.js';
import HeaderContainer from '../../header/header.container.js';

const electron = require('electron');
const path = require('path');
const notifier = require('node-notifier');

class GroupsContainer extends React.Component {
  constructor(props) {
    super(props);
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData');
    this.path = path.join(userDataPath, 'shortcuts.json');
    this.state = {
      groupsList: this.props.groupsList,
    };
  }

  showGroupNotification() {
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
        <GroupsForm />
      </div>
    );
  }
}

export default GroupsContainer;
