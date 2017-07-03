import React from 'react';

class ActionButtons extends React.Component {
  render() {
    return (
      <div className="buttons__container">
        <button type="button" className="action__button">New group</button>
        <button type=" button" className="action__button">New shortcut</button>
      </div>
    );
  }
}

export default ActionButtons;
