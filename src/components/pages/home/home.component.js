import React from 'react';
import ShortcutsList from './shortcuts-list.component.js';

class Home extends React.Component {
  render() {
    return (
      <ShortcutsList
        groups={this.props.groups}
        shortcuts={this.props.shortcuts}
        loadShortcuts={this.props.loadShortcuts}
        showNotification={this.props.showNotification}
      />
    );
  }
}

export default Home;
