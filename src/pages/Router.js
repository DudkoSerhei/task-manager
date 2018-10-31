import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Route imports
import HelloWorld from '../components/HelloWorld';

export function Router() {
  return (
    <Switch>
      <Route path="/" component={HelloWorld} />
    </Switch>
  );
}

export default Router;
