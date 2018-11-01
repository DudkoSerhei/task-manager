import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Typography } from '@material-ui/core';
import Transition from './Transition';

const propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  userName: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  isOpen: false,
  onClose: () => {},
  userName: '',
  email: '',
  description: '',
  url: '',
};

const styles = theme => ({
  dialogTitle: {
    color: theme.palette.primary.dark,
  },
  DialogContent: {
    height: '500px',
  },
  formButton: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.text,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    width: '100px',
    '&:hover': {
      color: theme.palette.primary.text,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
    },
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

function ViewDialog(props) {
  const {
    isOpen, onClose, userName,
    email, description, url, classes,
  } = props;

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={onClose}
    >
      <DialogTitle className={classes.dialogTitle}>
        View task
      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
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
          <Typography className={classes.text}>{url}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.formButton}
          variant="outlined"
          onClick={onClose}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ViewDialog.propTypes = propTypes;
ViewDialog.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(ViewDialog);
