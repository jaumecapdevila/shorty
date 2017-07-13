import React from 'react';
import { Link } from 'react-router-dom';

class NavigationButtons extends React.Component {
  render() {
    return (
      <div className="buttons__container">
        <button
          type="button"
          className="action__button"
        >
          <Link to="/groups">Add group</Link>
        </button>
        <button
          type="button"
          className="action__button"
        >
          <Link to="/shortcuts">Add shortcut</Link>
        </button>
      </div>
    );
  }
}

export default NavigationButtons;
