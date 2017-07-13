import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class ShortcutsList extends React.Component {
  render() {
    return (
      <div className="className">
        <select
          className="form-control"
          name="groups__list"
          onChange={this.props.loadShortcuts}
        >
          <option>Select a group</option>
          {
            this.props.groups.map((group, index) => (
              <option
                key={group.id}
                value={group.name}
              >
                {group.name}
              </option>
            ))}
        </select>

        <div className="shortcuts__container">
          {
            this.props.shortcuts.length >= 1
              ? <h2 className="list__title">Shortcuts</h2>
              : null
          }
          <ol className="shortcuts__list">
            {
              this.props.shortcuts.map(
                shortcut => (
                  <li
                    key={shortcut.id}
                    className="list__item"
                  >
                    <CopyToClipboard
                      text={shortcut.command}
                      onCopy={this.props.showNotification}
                    >
                      <span>{shortcut.alias}</span>
                    </CopyToClipboard>
                  </li>
                ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default ShortcutsList;
