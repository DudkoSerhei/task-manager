import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, MenuItem } from '@material-ui/core';
import Transition from './Transition';
import { setFilters, fetchTasks } from '../../actions';

const propTypes = {
  page: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  setFilters: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  onClose: () => {},
  page: 1,
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
  input: {
    textTransform: 'capitalize',
  },
  item: {
    textTransform: 'capitalize',
  },
});

const FILTERS = ['username', 'email', 'status'];
const SORT = ['ascending', 'descrease'];

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
    const { page } = this.props;
    const { currentFilter, currentSort, values } = this.state;
    const sortDirection = currentSort === 'ascending' ? 'asc' : 'desc';

    this.setState({
      values: { filter: currentFilter, sort: sortDirection },
    });

    const data = {
      page,
      sort_field: currentFilter,
      sort_direction: sortDirection,
    };

    this.props.fetchTasks(data);
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
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
          >
            {FILTERS.map(filter => (
              <MenuItem
                key={filter}
                value={filter}
                className={classes.item}
              >
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
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
          >
            {SORT.map(sort => (
              <MenuItem
                key={sort}
                value={sort}
                className={classes.item}
              >
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

const stateToProps = state => ({
  page: state.tasks.page,
});

const dispatchToProps = dispatch => ({
  setFilters: (...args) => dispatch(setFilters(...args)),
  fetchTasks: (...args) => dispatch(fetchTasks(...args)),
});

const enhance = compose(
  withStyles(styles),
  connect(stateToProps, dispatchToProps),
);

export default enhance(FilterDialog);
