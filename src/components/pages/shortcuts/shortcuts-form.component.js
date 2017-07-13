import React from 'react';

class EditShortcuts extends React.Component {
  render() {
    return (
      <div className="shortcuts__form">
        <div className="form__container">
          <select
            className="form-control shortcuts__select"
            name="groups__list"
            onChange={this.props.handleGroupChange}
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
          <h2 className="form__title">Add a new shortcut</h2>
          <input
            className={`form-control shortcuts__input ${this.props.className}`}
            value={this.props.shortcutName}
            onChange={this.props.handleShortcutChange}
            type="text"
          />
          <button
            className="add-project__button"
            onClick={this.props.handleClick}
          >
            Add
          </button>
        </div>
        <ol className="errors__list">
          {this.props.errors.map((error, index) => (
            <li className="error" key={error.index}>{error.description}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default EditShortcuts;
