import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D3C5F',
      text: '#E5EBF1',
      contrastText: '#397099',
      dark: '#161D2D',
      white: '#FFF',
      gray: 'rgba(0, 0, 0, 0.23)',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

global.theme = theme;

export default theme;

