import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, IconButton, Badge, Tooltip, CardActions, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { CheckCircle, Clear, MoreVert, Edit } from '@material-ui/icons';
import { EditDialog } from '../../components/Dialogs';
import defaultSrc from '../../images/task.png';
import Utils from '../../utils';

const propTypes = {
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  src: PropTypes.string,
  status: PropTypes.number,
  edit: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
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
    bottom: 0,
    right: 0,
  },
  actionColor: {
    color: theme.palette.primary.main,
  },
});

class TaskCard extends React.Component {
  state = {
    currentStatus: this.props.status,
    anchorEl: null,
    isEditDialogOpen: false,
  }

  onStatusAprove = () => {
    this.setState({
      currentStatus: 10,
    });
  };

  onStatusUndone = () => {
    this.setState({
      currentStatus: 0,
    });
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
      edit, classes, src, id,
    } = this.props;
    const { anchorEl, currentStatus, isEditDialogOpen } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent>
          {currentStatus === 10 ?
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
            {Utils.cutText(description, 500)}
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
            <Tooltip title={currentStatus !== 10 ? 'Done' : 'Undone'}>
              <IconButton
                onClick={currentStatus !== 10 ? this.onStatusAprove : this.onStatusUndone}
              >
                {currentStatus !== 10 ?
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
          status={currentStatus}
        />
      </Card>
    );
  }
}

TaskCard.propTypes = propTypes;
TaskCard.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(TaskCard);
