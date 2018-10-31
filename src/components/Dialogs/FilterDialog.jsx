import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, Slide, MenuItem } from '@material-ui/core';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
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
    color: theme.palette.primary.dark,
    width: '250px',
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const FILTERS = ['UserName', 'Email', 'Status'];

class FilterDialog extends React.Component {
  state = {
    currentFilter: FILTERS[0],
  }

  handleFilter = (event) => {
    this.setState({
      currentFilter: event.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      currentFilter: FILTERS[0],
    });
  }

  handleClose = () => {
    this.setState({
      currentFilter: FILTERS[0],
    });

    this.props.onClose();
  }

  handleApply = () => {
    const { currentFilter } = this.state;

    console.log(currentFilter, 'currentFilter');
    this.props.onClose();
  }

  render() {
    const { classes, isOpen, onClose } = this.props;
    const { currentFilter } = this.state;

    return (
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={onClose}
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

const enhance = withStyles(styles);

export default enhance(FilterDialog);
