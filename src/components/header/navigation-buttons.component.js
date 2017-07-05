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
          <Link to="/groups">Edit Groups</Link>
        </button>
        <button
          type="button"
          className="action__button"
        >
          Edit shortcuts
        </button>
      </div>
    );
  }
}

export default NavigationButtons;
