import React from 'react';
import ReactDOM from 'react-dom';

import ShortcutsListContainer from './containers/pages/shortcuts-list.container.js';
import HeaderContainer from './containers/header/header-container.js';

ReactDOM.render(
  <HeaderContainer />,
  document.getElementById('header'),
);

ReactDOM.render(
  <ShortcutsListContainer />,
  document.getElementById('content'),
);
