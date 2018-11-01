import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, locationProps } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Tooltip, ListItemIcon, ListItemText, Snackbar } from '@material-ui/core';
import { FilterList, AccountCircle, Input, PowerSettingsNew, Face } from '@material-ui/icons';
import { FilterDialog, Transition } from '../Dialogs';
import { setUser } from '../../actions';
import { UserShape } from '../../shapes';
import Utils from '../../utils';

const propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.shape(locationProps),
  user: PropTypes.shape(UserShape),
  setUser: PropTypes.func.isRequired,
};

const defaultProps = {
  className: '',
  location: {},
  user: {},
};

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginRight: '10px',
    color: theme.palette.primary.text,
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuItem: {
    color: theme.palette.primary.dark,
    width: '120px',
  },
  icon: {
    color: theme.palette.primary.dark,
  },
  primary: {
    color: theme.palette.primary.dark,
  },
});

class PageActions extends React.Component {
  state = {
    isFilterOpen: false,
    anchorEl: null,
    isSnackbarOpen: false,
  }

  onFilterOpen = () => {
    this.setState({
      isFilterOpen: true,
    });
  };

  onFilterClose = () => {
    this.setState({
      isFilterOpen: false,
    });
  };

  onMenuOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  onMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  onSnackbarClose = () => {
    this.setState({
      isSnackbarOpen: false,
    });
  };

  onSnackbarOpen = () => {
    this.setState({
      isSnackbarOpen: true,
    });
  };

  onAuthClick = () => {
    const { history, user } = this.props;

    if (Object.keys(user).length !== 0) {
      this.onSnackbarOpen();
      setTimeout(() =>
        Utils.invokeAll(history.push('/login', this.props.setUser({}))), 1000);
    } else {
      history.push('/login');
    }
  }

  render() {
    const {
      classes, className, location, user,
    } = this.props;
    const { isFilterOpen, anchorEl, isSnackbarOpen } = this.state;

    return (
      <div className={cn(classes.container, className)}>
        {location.pathname === '/' &&
          <Tooltip title="Filter">
            <IconButton
              className={classes.button}
              onClick={this.onFilterOpen}
            >
              <FilterList color="inherit" />
            </IconButton>
          </Tooltip>
        }
        <Tooltip title="User Menu">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            className={classes.button}
            onClick={this.onMenuOpen}
          >
            {Object.keys(user).length === 0 ?
              <AccountCircle color="inherit" /> :
              <Face color="inherit" />
            }
          </IconButton>
        </Tooltip>
        <FilterDialog
          isOpen={isFilterOpen}
          onClose={this.onFilterClose}
        />
        <Menu
          id="login-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClose}
        >
          <MenuItem
            className={classes.menuItem}
            onClick={Utils.invokeAll(this.onAuthClick, this.onMenuClose)}
          >
            <ListItemIcon className={classes.icon}>
              {Object.keys(user).length !== 0 ?
                <PowerSettingsNew /> :
                <Input />
              }
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary={Object.keys(user).length !== 0 ? 'Logout' : 'Login'}
            />
          </MenuItem>
        </Menu>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={isSnackbarOpen}
          onClose={this.onSnackbarClose}
          TransitionComponent={Transition}
          ContentProps={{
            'aria-describedby': 'logout-message',
          }}
          message={<span id="logout-message">Logout succesfull!</span>}
        />
      </div>
    );
  }
}

PageActions.propTypes = propTypes;
PageActions.defaultProps = defaultProps;

const stateToProps = state => ({
  user: state.auth.user,
});

const dispatchToProps = dispatch => ({
  setUser: (...args) => dispatch(setUser(...args)),
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(stateToProps, dispatchToProps),
);

export default enhance(PageActions);
