import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, IconButton, Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, Slide } from '@material-ui/core';
import { FilterList, AccountCircle } from '@material-ui/icons';

const propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  className: '',
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const FILTERS = ['UserName', 'Email', 'Status'];

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
  dialogTitle: {
    color: theme.palette.primary.dark,
  },
  dialogContent: {
    overflowY: 'visible',
  },
  textField: {
    color: theme.palette.primary.dark,
    width: '250px',
  },
  filterButton: {
    color: theme.palette.primary.dark,
  },
  menuItem: {
    color: theme.palette.primary.dark,
    width: '120px',
  },
});

class PageActions extends React.Component {
  state = {
    isFilterOpen: false,
    currentFilter: FILTERS[0],
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

  onFilterChange = (event) => {
    this.setState({
      currentFilter: event.target.value,
    });
  };

  onFilterReset = () => {
    this.setState({
      currentFilter: FILTERS[0],
    });
  }

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
    const { classes, className } = this.props;
    const { isFilterOpen, currentFilter, anchorEl } = this.state;

    return (
      <div className={cn(classes.container, className)}>
        <IconButton
          className={classes.button}
          onClick={this.onFilterOpen}
        >
          <FilterList color="inherit" />
        </IconButton>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          className={classes.button}
          onClick={this.onMenuOpen}
        >
          <AccountCircle color="inherit" />
        </IconButton>
        <Dialog
          open={isFilterOpen}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          onClose={this.onFilterClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            className={classes.dialogTitle}
          >
            Filter tasks
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <TextField
              select
              label="Filter by"
              className={classes.textField}
              value={currentFilter}
              onChange={this.onFilterChange}
              helperText="Please select your filter"
              variant="outlined"
            >
              {FILTERS.map(filter => (
                <MenuItem key={filter} value={filter}>
                  {filter}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.filterButton}
              variant="outlined"
              onClick={this.onFilterReset}
            >
              Reset Filters
            </Button>
            <Button
              className={classes.filterButton}
              variant="outlined"
              onClick={this.onFilterClose}
            >
              Cancel
            </Button>
            <Button
              className={classes.filterButton}
              variant="outlined"
              onClick={this.onFilterClose}
            >
              Filter
            </Button>
          </DialogActions>
        </Dialog>
        <Menu
          id="login-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClose}
        >
          <MenuItem
            className={classes.menuItem}
            onClick={this.onMenuClose}
          >
            Log in
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

PageActions.propTypes = propTypes;
PageActions.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(PageActions);
