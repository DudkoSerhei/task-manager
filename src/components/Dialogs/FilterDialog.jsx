import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, MenuItem } from '@material-ui/core';
import Transition from './Transition';
import { setFilters } from '../../actions';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  setFilters: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  onClose: () => {},
};

const styles = theme => ({
  dialogTitle: {
    color: theme.palette.primary.dark,
  },
  dialogContent: {
    overflowY: 'visible',
  },
  textField: {
    display: 'flex',
    color: theme.palette.primary.dark,
    width: '250px',
    marginBottom: '25px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  filterButton: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.text,
    '&:hover': {
      color: theme.palette.primary.text,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
    },
    '&:first-child': {
      margin: '0 auto 0 22px',
    },
  },
});

const FILTERS = ['UserName', 'Email', 'Status'];
const SORT = ['Ascending', 'Decrease'];

const defaultValues = () => ({
  filter: FILTERS[0],
  sort: SORT[0],
});

class FilterDialog extends React.Component {
  state = {
    currentFilter: FILTERS[0],
    currentSort: SORT[0],
    values: defaultValues(),
  }

  handleFilter = (event) => {
    this.setState({
      currentFilter: event.target.value,
    });
  };

  handleSort = (event) => {
    this.setState({
      currentSort: event.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      currentFilter: FILTERS[0],
      currentSort: SORT[0],
      values: defaultValues(),
    });

    this.props.setFilters({});
  }

  handleClose = () => {
    this.setState({
      currentFilter: FILTERS[0],
      currentSort: SORT[0],
      values: defaultValues(),
    });

    this.props.setFilters({});
    this.props.onClose();
  }

  handleApply = () => {
    const { currentFilter, currentSort, values } = this.state;

    this.setState({
      values: { filter: currentFilter, sort: currentSort },
    });

    this.props.setFilters(values);
    this.props.onClose();
  }

  render() {
    const { classes, isOpen } = this.props;
    const { currentFilter, currentSort } = this.state;

    return (
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={this.handleClose}
        aria-labelledby="filter-dialog-title"
      >
        <DialogTitle
          id="filter-dialog-title"
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
            onChange={this.handleFilter}
            helperText="Please select your filter"
            variant="outlined"
          >
            {FILTERS.map(filter => (
              <MenuItem key={filter} value={filter}>
                {filter}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Sort by"
            className={classes.textField}
            value={currentSort}
            onChange={this.handleSort}
            helperText="Please select your sort type"
            variant="outlined"
          >
            {SORT.map(sort => (
              <MenuItem key={sort} value={sort}>
                {sort}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.filterButton}
            variant="outlined"
            onClick={this.handleReset}
          >
            Reset Filters
          </Button>
          <Button
            className={classes.filterButton}
            variant="outlined"
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            className={classes.filterButton}
            variant="outlined"
            onClick={this.handleApply}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

FilterDialog.propTypes = propTypes;
FilterDialog.defaultProps = defaultProps;

const stateToProps = () => ({});

const dispatchToProps = dispatch => ({
  setFilters: (...args) => dispatch(setFilters(...args)),
});

const enhance = compose(
  withStyles(styles),
  connect(stateToProps, dispatchToProps),
);

export default enhance(FilterDialog);
