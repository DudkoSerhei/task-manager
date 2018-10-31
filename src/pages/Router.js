import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Route imports
import TaskPage from './tasks';

export function Router() {
  return (
    <Switch>
      <Route path="/" component={TaskPage} />
    </Switch>
  );
}

export default Router;
