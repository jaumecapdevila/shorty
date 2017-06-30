import React from 'react';
import ReactDOM from 'react-dom';

import ShortcutsListContainer from './containers/content/shortcuts-list.container.js';
import HeaderContainer from './containers/header/header-container.js';

ReactDOM.render(
  <HeaderContainer />,
  document.querySelector('.navigation__container'),
);

ReactDOM.render(
  <ShortcutsListContainer />,
  document.getElementById('content'),
);
