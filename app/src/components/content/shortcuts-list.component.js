import React from 'react';

class ShortcutsList extends React.Component {
  render() {
    const groups = Object.keys(this.props.groupsList).map(item =>
      this.props.groupsList[item],
    );
    const shortcuts = this.props.shortcutsList;
    return (
      <div className="className">
        <select
          className="form-control"
          name="groups__list"
          onChange={this.props.loadShortcuts}
        >
          <option>Select a group</option>
          {
            groups.map(
              item => <option value={item.group}>{item.group}</option>)
          }
        </select>

        <div className="shortcuts__container">
          {
            shortcuts.length >= 1
              ? <h2 className="list__title">Shortcuts</h2>
              : ''
          }
          <ol className="shortcuts__list">
            {
              shortcuts.map(
                shortcut => <li className="list__item">{shortcut.command}</li>,
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default ShortcutsList;
