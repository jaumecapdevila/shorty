import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import HomeContainer from './containers/pages/home/home.container.js';
import GroupsContainer from './containers/pages/groups/groups.container.js';
import ShortcutsContainer from './containers/pages/shortcuts/shortcuts.container.js';

const App = () => (
  <HashRouter>
    <div className="app">
      <Switch>
        <Route exact path="/" component={HomeContainer}/>
        <Route path="/groups" component={GroupsContainer}/>
        <Route path="/shortcuts" component={ShortcutsContainer}/>
      </Switch>
    </div>
  </HashRouter>
);

ReactDOM.render((
  App()
), document.getElementById('root'));
