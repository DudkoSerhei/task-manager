import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { compose } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Tooltip } from '@material-ui/core';
import { FilterList, AccountCircle } from '@material-ui/icons';
import { FilterDialog } from '../Dialogs';
import Utils from '../../utils';

const propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {
  className: '',
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
});

class PageActions extends React.Component {
  state = {
    isFilterOpen: false,
    anchorEl: null,
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

  render() {
    const { classes, className, history } = this.props;
    const { isFilterOpen, anchorEl } = this.state;

    return (
      <div className={cn(classes.container, className)}>
        <Tooltip title="Filter">
          <IconButton
            className={classes.button}
            onClick={this.onFilterOpen}
          >
            <FilterList color="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="User Menu">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            className={classes.button}
            onClick={this.onMenuOpen}
          >
            <AccountCircle color="inherit" />
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
            onClick={Utils.invokeAll(() => history.push('/login'), this.onMenuClose)}
          >
            Login
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

PageActions.propTypes = propTypes;
PageActions.defaultProps = defaultProps;

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(PageActions);
