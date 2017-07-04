import React from 'react';

class ActionButtons extends React.Component {
  render() {
    return (
      <div className="buttons__container">
        <button
          type="button"
          className="action__button"
          onClick={this.props.renderEditGroupsPage}
        >
          Edit groups
        </button>
        <button
          type="button"
          className="action__button"
          onClick={this.props.renderEditShortcutsPage}
        >
          Edit shortcuts
        </button>
      </div>
    );
  }
}

export default ActionButtons;
