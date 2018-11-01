import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Snackbar, Slide, InputAdornment, IconButton } from '@material-ui/core';
import { AccountBox, VisibilityOff, Visibility, Person } from '@material-ui/icons';
import { USER } from '../../env';
import { setUser } from '../../actions';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  setUser: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '350px',
    height: '500px',
    border: `3px solid ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '15px',
    padding: '30px 15px',
    margin: '0 auto',
  },
  icon: {
    color: theme.palette.primary.text,
    fontSize: '100px',
  },
  textField: {
    width: '100%',
    marginBottom: '10px',
  },
  textFieldOutline: {
    backgroundColor: theme.palette.primary.text,
  },
  textFieldInput: {
    zIndex: 5,
  },
  button: {
    width: '180px',
    color: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.text,
    marginTop: '40px',
    '&:hover': {
      backgroundColor: theme.palette.primary.gray,
    },
  },
  buttonInput: {
    color: theme.palette.primary.main,
  },
  iconInput: {
    color: theme.palette.primary.main,
    zIndex: 5,
    marginRight: '12px',
  },
  message: {
    textAlign: 'center',
  },
});

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    isSnackbarOpen: false,
    showPassword: false,
    snackbarText: '',
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleOpen = () => {
    this.setState({
      isSnackbarOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isSnackbarOpen: false,
      username: '',
      password: '',
      snackbarText: '',
    });
  };

  handleUserNameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = () => {
    const { username, password } = this.state;

    const user = { username, password };

    if (isEqual(user, USER)) {
      this.props.setUser(user);
      this.setState({
        snackbarText: 'Login successfull!',
      });
      this.handleOpen();
      setTimeout(() => this.props.history.push('/'), 1000);
    } else {
      this.setState({
        snackbarText: 'Wrong username or password. Check it!',
      });
      this.handleOpen();
    }
  }

  render() {
    const { classes } = this.props;
    const {
      isSnackbarOpen, username, password,
      showPassword, snackbarText,
    } = this.state;

    return (
      <form className={classes.form} onSubmit={this.handleLogin}>
        <AccountBox className={classes.icon} />
        <TextField
          value={username}
          label="Username"
          className={classes.textField}
          InputProps={{
            classes: {
              notchedOutline: classes.textFieldOutline,
              input: classes.textFieldInput,
            },
            endAdornment: (
              <InputAdornment position="end">
                <Person className={classes.iconInput} />
              </InputAdornment>
            ),
          }}
          onChange={this.handleUserNameChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          value={password}
          type={showPassword ? 'text' : 'password'}
          label="Passsword"
          className={classes.textField}
          InputProps={{
            classes: {
              notchedOutline: classes.textFieldOutline,
              input: classes.textFieldInput,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className={classes.buttonInput}
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={this.handlePasswordChange}
          margin="normal"
          variant="outlined"
        />
        <Button
          className={classes.button}
          variant="outlined"
          onClick={this.handleLogin}
        >
          Login
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={isSnackbarOpen}
          onClose={this.handleClose}
          TransitionComponent={TransitionDown}
          ContentProps={{
            'aria-describedby': 'login-message',
          }}
          message={<span id="login-message">{snackbarText}</span>}
        />
      </form>
    );
  }
}

LoginForm.propTypes = propTypes;

const stateToProps = () => ({});

const dispatchToProps = dispatch => ({
  setUser: (...args) => dispatch(setUser(...args)),
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(stateToProps, dispatchToProps),
);

export default enhance(LoginForm);
