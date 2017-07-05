import React from 'react';

class GroupsForm extends React.Component {
  render() {
    return (
      <div className="groups__from">
        <h2 className="form__title">Add a new project</h2>
        <input className="form-control groups__input" type="text" />
        <button className="add-project__button">Add</button>
      </div>
    );
  }
}

export default GroupsForm;
