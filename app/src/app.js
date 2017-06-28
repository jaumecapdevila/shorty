import React from 'react';
import ReactDOM from 'react-dom';

import FooterContainer from './containers/footer/footer.container.js';
import ShortcutsListContainer from './containers/content/shortcuts-list.container.js';

ReactDOM.render(
  <ShortcutsListContainer />,
  document.getElementById('content'),
);

ReactDOM.render(
  <FooterContainer />,
  document.getElementById('footer'),
);
