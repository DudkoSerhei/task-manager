import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Transition from './Transition';
import ViewDialog from './ViewDialog';
import { createTask } from '../../actions';
import Utils from '../../utils';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  createTask: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  onClose: () => {},
};

const styles = theme => ({
  dialogTitle: {
    color: theme.palette.primary.dark,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  textField: {
    color: theme.palette.primary.dark,
    width: '250px',
  },
  textFieldMulti: {
    color: theme.palette.primary.dark,
    width: '100%',
    marginBottom: '20px',
  },
  button: {
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
  form: {
    minHeight: '300px',
    overflowY: 'auto',
  },
  formButton: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.text,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    width: '250px',
    '&:hover': {
      color: theme.palette.primary.text,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
    },
  },
  buttonIcon: {
    marginLeft: 'auto',
  },
  file: {
    marginLeft: '30px',
  },
});

class CreateTaskDialog extends React.Component {
  constructor() {
    super();
    this.attachmentInput = React.createRef();
    this.state = {
      userName: '',
      email: '',
      description: '',
      file: {},
      isViewOpen: false,
      usernameError: false,
      emailError: false,
      descriptionError: false,
      fileError: true,
    };
  }

  onUserNameValidate = () => {
    if (this.state.userName === '') {
      this.setState({ usernameError: true });
    } else {
      this.setState({ usernameError: false });
    }
  };

  onEmailValidate = () => {
    if (this.state.email === '') {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
    }
  };

  onDescriptionValidate = () => {
    if (this.state.description === '') {
      this.setState({ descriptionError: true });
    } else {
      this.setState({ descriptionError: false });
    }
  };

  handleUserNameChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      userName: '',
      email: '',
      description: '',
      file: {},
      emailError: false,
      usernameError: false,
      descriptionError: false,
    });

    this.props.onClose();
  };

  handleCreate = () => {
    const { file } = this.state;

    const formData = new FormData(document.forms.task);

    formData.append('image', file);

    this.props.createTask(formData);
    this.handleClose();
  };

  clickAttachmentInput = () => {
    this.attachmentInput.current.click();
  };

  handleChangeFile = (event) => {
    const file = event.target.files[0];

    console.log(Utils.checkImageSize(file));

    this.setState({ file, fileError: false });
  };

  handlePreview = () => {
    this.setState({
      isViewOpen: true,
    });
  };

  handleViewClose = () => {
    this.setState({
      isViewOpen: false,
    });
  };

  render() {
    const { classes, isOpen } = this.props;
    const {
      userName, email, description,
      file, isViewOpen, usernameError,
      emailError, fileError, descriptionError,
    } = this.state;

    return (
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={this.handleClose}
        aria-labelledby="create-dialog-title"
      >
        <DialogTitle
          id="create-dialog-title"
          className={classes.dialogTitle}
        >
          Create new task
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <form
            className={classes.form}
            onSubmit={this.handleCreate}
            name="task"
          >
            <div className={classes.row}>
              <TextField
                value={userName}
                name="username"
                label="User name"
                className={classes.textField}
                onChange={this.handleUserNameChange}
                onBlur={this.onUserNameValidate}
                error={usernameError}
                helperText="Username for assign this task"
                margin="normal"
                variant="outlined"
              />
              <TextField
                value={email}
                name="email"
                label="Email"
                type="email"
                className={classes.textField}
                onChange={this.handleEmailChange}
                onBlur={this.onEmailValidate}
                error={emailError}
                helperText="Email for this user"
                margin="normal"
                variant="outlined"
              />
            </div>
            <TextField
              value={description}
              name="text"
              label="Description"
              className={classes.textFieldMulti}
              onChange={this.handleDescriptionChange}
              onBlur={this.onDescriptionValidate}
              error={descriptionError}
              helperText="Description for this task"
              margin="normal"
              variant="outlined"
              multiline
              rowsMax={5}
            />
            <div className={classes.row}>
              <Button
                variant="contained"
                className={classes.formButton}
                onClick={this.clickAttachmentInput}
              >
                Upload
                <AddIcon className={classes.buttonIcon} />
              </Button>
              {file && file.name &&
                <Typography className={classes.file} variant="body1">{file.name}</Typography>
              }
            </div>
            <input
              ref={this.attachmentInput}
              style={{ visibility: 'hidden' }}
              type="file"
              onChange={this.handleChangeFile}
              accept="image/gif, image/jpeg, image/png"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={this.handlePreview}
            disabled={userName === '' || email === '' ||
              description === '' || file === {} || fileError ||
              usernameError || emailError || descriptionError
            }
          >
            Preview
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={this.handleCreate}
            disabled={userName === '' || email === '' ||
              description === '' || file === {} || fileError ||
              usernameError || emailError || descriptionError
            }
          >
            Create
          </Button>
        </DialogActions>
        <ViewDialog
          isOpen={isViewOpen}
          onClose={this.handleViewClose}
          userName={userName}
          email={email}
          description={description}
          file={file}
        />
      </Dialog>
    );
  }
}

CreateTaskDialog.propTypes = propTypes;
CreateTaskDialog.defaultProps = defaultProps;

const stateToProps = () => ({});

const dispatchToProps = {
  createTask,
};

const enhance = compose(
  withStyles(styles),
  connect(stateToProps, dispatchToProps),
);

export default enhance(CreateTaskDialog);
