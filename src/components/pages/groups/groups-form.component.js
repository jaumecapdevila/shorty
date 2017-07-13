import React from 'react';

class GroupsForm extends React.Component {
  render() {
    return (
      <div className="groups__form">
        <div className="form__container">
          <h2 className="form__title">Add a new group</h2>
          <input
            className={`form-control groups__input ${this.props.className}`}
            value={this.props.groupName}
            onChange={this.props.handleChange}
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

export default GroupsForm;
