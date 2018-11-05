import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, MenuItem } from '@material-ui/core';
import Transition from './Transition';
import { editTask, fetchTasks } from '../../actions';
import Utils from '../../utils';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  page: PropTypes.number,
  fetchTasks: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
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
  select: {
    display: 'flex',
    color: theme.palette.primary.dark,
    width: '100px',
    marginBottom: '25px',
  },
  textField: {
    display: 'flex',
    color: theme.palette.primary.dark,
    width: '100%',
  },
  filterButton: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.text,
    '&:hover': {
      color: theme.palette.primary.text,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
    },
  },
});

const STATUSES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class FilterDialog extends React.Component {
  state = {
    currentStatus: this.props.status,
    currentDescription: this.props.text,
    statusError: false,
    descriptionError: false,
  }

  handleStatusValidate = () => {
    if (this.state.currentStatus === '') {
      this.setState({ statusError: true });
    } else {
      this.setState({ statusError: false });
    }
  };

  handleDescriptionValidate = () => {
    if (this.state.currentDescription === '') {
      this.setState({ descriptionError: true });
    } else {
      this.setState({ descriptionError: false });
    }
  };

  handleStatus = (event) => {
    this.setState({
      currentStatus: +event.target.value,
    });
  };

  handleDescription = (event) => {
    this.setState({
      currentDescription: event.target.value,
    });
  };

  handleClose = () => {
    const { status, text } = this.props;
    this.setState({
      currentStatus: +status,
      currentDescription: text,
    });

    this.props.onClose();
  }

  handleEdit = () => {
    const { id, page } = this.props;
    const { currentStatus, currentDescription } = this.state;

    const task = {
      status: currentStatus,
      text: currentDescription,
    };

    const data = {
      page,
    };

    Utils.invokeAll(this.props.editTask(id, task), this.props.fetchTasks(data));
    this.props.onClose();
  }

  render() {
    const { classes, isOpen, userName } = this.props;
    const {
      currentStatus, currentDescription,
      statusError, descriptionError,
    } = this.state;

    return (
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={this.handleClose}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle
          id="edit-dialog-title"
          className={classes.dialogTitle}
        >
          {`Edit task for ${userName}`}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            select
            label="Select status"
            className={classes.select}
            value={currentStatus}
            onChange={this.handleStatus}
            onBlur={this.handleStatusValidate}
            error={statusError}
            helperText="Please select status for this task"
            variant="outlined"
          >
            {STATUSES.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            multiline
            label="Description"
            className={classes.textField}
            value={currentDescription}
            onChange={this.handleDescription}
            onBlur={this.handleDescriptionValidate}
            error={descriptionError}
            helperText="Description for this task"
            variant="outlined"
            rowsMax={5}
          />
        </DialogContent>
        <DialogActions>
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
            onClick={this.handleEdit}
            disabled={statusError || descriptionError}
          >
            Edit
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
  editTask: (...args) => dispatch(editTask(...args)),
  fetchTasks: (...args) => dispatch(fetchTasks(...args)),
});

const enhance = compose(
  withStyles(styles),
  connect(stateToProps, dispatchToProps),
);

export default enhance(FilterDialog);
