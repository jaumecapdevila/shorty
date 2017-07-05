import React from 'react';
import ShortcutsList from './shortcuts-list.component.js';

class Home extends React.Component {
  render() {
    return (
      <ShortcutsList
        groupsList={this.props.groupsList}
        shortcutsList={this.props.shortcutsList}
        loadShortcuts={this.props.loadShortcuts}
        showNotification={this.props.showNotification}
      />
    );
  }
}

export default Home;
