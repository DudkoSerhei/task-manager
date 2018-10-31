import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Snackbar, Slide } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
    backgroundColor: theme.palette.primary.contrastText,
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
  },
});

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    isSnackbarOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isSnackbarOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isSnackbarOpen: false,
    });
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;

    if (email === 'admin' && password === '123') {
      this.props.history.push('/');
    }

    if (email !== 'admin' || password !== '123') {
      this.handleOpen();
    }

    return { email, password };
  }

  render() {
    const { classes } = this.props;
    const { isSnackbarOpen, email, password } = this.state;

    return (
      <form className={classes.form} onSubmit={this.handleLogin}>
        <AccountBox className={classes.icon} />
        <TextField
          value={email}
          label="Email"
          className={classes.textField}
          InputProps={{
            classes: {
              notchedOutline: classes.textFieldOutline,
              input: classes.textFieldInput,
            },
          }}
          onChange={this.handleEmailChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          value={password}
          type="password"
          label="Passsword"
          className={classes.textField}
          InputProps={{
            classes: {
              notchedOutline: classes.textFieldOutline,
              input: classes.textFieldInput,
            },
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
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Wrong username or password. Check it!</span>}
        />
      </form>
    );
  }
}

LoginForm.propTypes = propTypes;

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(LoginForm);
