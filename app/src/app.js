import React from 'react';
import ReactDOM from 'react-dom';

import FooterContainer from './containers/footer/footer.container.js';
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

ReactDOM.render(
  <FooterContainer />,
  document.getElementById('footer'),
);
