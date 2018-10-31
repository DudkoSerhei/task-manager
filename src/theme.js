import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#92C9D7',
      main: '#005C7B',
      dark: '#070513',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

global.theme = theme;

export default theme;

