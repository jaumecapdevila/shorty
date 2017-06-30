import React from 'react';

class ShortcutsList extends React.Component {
  render() {
    const groups = Object.keys(this.props.groupsList).map(item =>
      this.props.groupsList[item],
    );
    const shortcuts = this.props.shortcutsList;
    return (
      <div className="className">
        <select className="form-control" name="groups__list">
          <option>Select a group</option>
          {
            groups.map(
              item => <option value={item.group}>{item.group}</option>)
          }
        </select>
        <ol className="shortcuts__list">
          {
            shortcuts.map(
              shortcut => <li>{shortcut.command}</li>)
          }
        </ol>
      </div>
    );
  }
}

export default ShortcutsList;
