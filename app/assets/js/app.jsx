import React from 'react';
import ReactDOM from 'react-dom';

const ShortcutsList = React.createClass({
  render() {
    return (
      <ul>
        {
          this.props.list.map(item => <li>{item}</li>)
        }
      </ul>
    );
  },
});
ReactDOM.render(<ShortcutsList list={['Git', 'npm']} />,
  document.getElementById('content'),
);
