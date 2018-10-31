import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, Slide, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  onClose: () => {},
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  title: {
    color: theme.palette.primary.dark,
    fontSize: '16px',
  },
  text: {
    color: theme.palette.primary.gray,
    fontSize: '14px',
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
    };
  }

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
    });

    this.props.onClose();
  };

  handleCreate = () => {
    const {
      userName, email, description, file,
    } = this.state;

    const data = {
      username: userName,
      email,
      text: description,
      image: file.url,
    };

    console.log(data, 'data');
  };

  clickAttachmentInput = () => {
    this.attachmentInput.current.click();
  };

  handleChangeFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.setState({
      file: { url: file.name, data: formData },
    });
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
      file, isViewOpen,
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
          <form className={classes.form} onSubmit={this.handleCreate}>
            <div className={classes.row}>
              <TextField
                value={userName}
                label="User name"
                className={classes.textField}
                onChange={this.handleUserNameChange}
                helperText="Username for assign this task"
                margin="normal"
                variant="outlined"
              />
              <TextField
                value={email}
                label="Email"
                className={classes.textField}
                onChange={this.handleEmailChange}
                helperText="Email for this user"
                margin="normal"
                variant="outlined"
              />
            </div>
            <TextField
              value={description}
              label="Description"
              className={classes.textFieldMulti}
              onChange={this.handleDescriptionChange}
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
              {Object.keys(file).length !== 0 &&
                <Typography className={classes.file} variant="p">{file.url}</Typography>
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
          >
            Create
          </Button>
        </DialogActions>
        <Dialog
          open={isViewOpen}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          onClose={this.handleViewClose}
        >
          <DialogTitle className={classes.dialogTitle}>
            View task
          </DialogTitle>
          <DialogContent style={{ height: '500px' }}>
            <div className={classes.column}>
              <Typography className={classes.title}>Username</Typography>
              <Typography className={classes.text}>{userName}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.title}>Email</Typography>
              <Typography className={classes.text}>{email}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.title}>Description</Typography>
              <Typography className={classes.text}>{description}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.title}>Filename</Typography>
              <Typography className={classes.text}>{file.url}</Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.formButton}
              variant="outlined"
              onClick={this.handleViewClose}
              style={{ width: '100px' }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    );
  }
}

CreateTaskDialog.propTypes = propTypes;
CreateTaskDialog.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(CreateTaskDialog);
