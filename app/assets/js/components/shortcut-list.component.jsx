import React from 'react';

const ShortcutsList = React.createClass({
  render() {
    return (
      <ol className="shortcut-list">
        {
          this.props.list.map(item => <li>{item}</li>)
        }
      </ol>
    );
  },
});

export default ShortcutsList;
