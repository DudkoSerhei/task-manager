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
  file: PropTypes.shape({
    name: PropTypes.string,
    lastModified: PropTypes.number,
    lastModifiedDate: PropTypes.instanceOf(Date),
    size: PropTypes.number,
    type: PropTypes.string,
    webkitRelativePath: PropTypes.string,
  }),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  isOpen: false,
  onClose: () => {},
  userName: '',
  email: '',
  description: '',
  file: {},
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
  image: {
    maxWidth: '320px',
    maxHeight: '240px',
    marginTop: '10px',
  },
});

class ViewDialog extends React.Component {
  onImageUpload = (file) => {
    const { classes } = this.props;
    const img = document.getElementsByClassName(classes.image);
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      img.src = fileReader.result;
    }, false);

    if (file && file.type && file.type.match('image.*')) {
      fileReader.readAsDataURL(file);
    }

    return img ? img.src : '';
  };

  render() {
    const {
      isOpen, onClose, userName,
      email, description, file, classes,
    } = this.props;

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
            <Typography className={classes.text}>{file.name}</Typography>
            <img src={this.onImageUpload(file)} className={classes.image} alt={file.name} />
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
}

ViewDialog.propTypes = propTypes;
ViewDialog.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(ViewDialog);
