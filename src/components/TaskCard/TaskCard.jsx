import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, IconButton, Badge, Tooltip, CardActions, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { CheckCircle, Clear, MoreVert, Edit } from '@material-ui/icons';
import { EditDialog } from '../../components/Dialogs';
import { editTask } from '../../actions';
import defaultSrc from '../../images/task.png';
import Utils from '../../utils';

const propTypes = {
  id: PropTypes.number,
  userName: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  status: PropTypes.number,
  edit: PropTypes.bool,
  editTask: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  id: 0,
  userName: '',
  description: '',
  email: '',
  src: defaultSrc,
  status: 0,
  edit: false,
};

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    position: 'relative',
  },
  media: {
    width: '220px',
    minWidth: '220px',
    maxHeight: '160px',
    borderRadius: '0 5px 5px 0',
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: theme.palette.primary.dark,
  },
  email: {
    fontStyle: 'italic',
    marginBottom: '20px',
    color: theme.palette.primary.dark,
  },
  description: {
    color: theme.palette.primary.dark,
  },
  badge: {
    right: 'auto',
    left: '-35px',
    top: '-25px',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.text,
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    right: '220px',
  },
  actionColor: {
    color: theme.palette.primary.main,
  },
});

class TaskCard extends React.Component {
  state = {
    anchorEl: null,
    isEditDialogOpen: false,
  }

  onStatusAprove = () => {
    const { id, description } = this.props;

    const task = {
      status: 10,
      text: description,
    };

    this.props.editTask(id, task);
  };

  onStatusUndone = () => {
    const { id, description } = this.props;

    const task = {
      status: 0,
      text: description,
    };

    this.props.editTask(id, task);
  };

  onMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onEditDialogOpen = () => {
    this.setState({
      isEditDialogOpen: true,
    });
  };

  onEditDialogClose = () => {
    this.setState({
      isEditDialogOpen: false,
    });
  };

  render() {
    const {
      userName, email, description,
      edit, classes, src, id, status,
    } = this.props;
    const { anchorEl, isEditDialogOpen } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent>
          {status === 10 ?
            <Badge classes={{ badge: classes.badge }} badgeContent={<CheckCircle />}>
              <Typography component="h3" className={classes.userName}>
                {userName}
              </Typography>
            </Badge> :
            <Typography component="h3" className={classes.userName}>
              {userName}
            </Typography>
          }
          <Typography component="h5" className={classes.email}>
            {email}
          </Typography>
          <Typography component="p" className={classes.description}>
            {Utils.cutText(description, 350)}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="Task Image"
          className={classes.media}
          image={src}
          title="Task Image"
        />
        {edit &&
          <CardActions className={classes.cardContent}>
            <Tooltip title={status !== 10 ? 'Done' : 'Undone'}>
              <IconButton
                onClick={status !== 10 ? this.onStatusAprove : this.onStatusUndone}
              >
                {status !== 10 ?
                  <CheckCircle className={classes.actionColor} /> :
                  <Clear className={classes.actionColor} />
                }
              </IconButton>
            </Tooltip>
            <Tooltip title="Actions">
              <IconButton
                aria-owns={anchorEl ? 'action-menu' : undefined}
                aria-haspopup="true"
                onClick={this.onMenuOpen}
              >
                <MoreVert className={classes.actionColor} />
              </IconButton>
            </Tooltip>
            <Menu
              id="action-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.onMenuClose}
            >
              <MenuItem
                onClick={Utils.invokeAll(this.onEditDialogOpen, this.onMenuClose)}
              >
                <ListItemIcon className={classes.actionColor}>
                  <Edit />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.actionColor }}
                  inset
                  primary="Edit"
                />
              </MenuItem>
            </Menu>
          </CardActions>
        }
        <EditDialog
          isOpen={isEditDialogOpen}
          onClose={this.onEditDialogClose}
          id={id}
          userName={userName}
          text={description}
          status={status}
        />
      </Card>
    );
  }
}

TaskCard.propTypes = propTypes;
TaskCard.defaultProps = defaultProps;

const stateToProps = () => ({});

const dispatchToProps = dispatch => ({
  editTask: (...args) => dispatch(editTask(...args)),
});

const enhance = compose(
  withStyles(styles),
  connect(stateToProps, dispatchToProps),
);

export default enhance(TaskCard);
