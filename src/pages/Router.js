import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Route imports
import TaskPage from './tasks';
import LoginPage from './login';

export function Router() {
  return (
    <Switch>
      <Route exact path="/" component={TaskPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}

export default Router;
