import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import { Router as RouterComponent } from './pages/Router';
import history from './history';
import theme from './theme';

function App() {
  return (
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <RouterComponent />
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
