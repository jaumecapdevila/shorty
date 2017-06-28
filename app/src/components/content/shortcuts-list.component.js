import React from 'react';

class ShortcutsList extends React.Component {
  render() {
    const shortcuts = [];
    const objectKeys = Object.keys(this.props.shortcutsList).map(item =>
      shortcuts.push(this.props.shortcutsList),
    );
    return (
      <ol className="shortcuts-list">
        {
          shortcuts.map(item => <li>1</li>)
        }
      </ol>
    );
  }
}

export default ShortcutsList;
