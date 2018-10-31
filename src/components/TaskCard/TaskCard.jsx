import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, IconButton, Badge, Tooltip, CardActions, Menu, MenuItem } from '@material-ui/core';
import { CheckCircle, Clear, MoreVert } from '@material-ui/icons';
import defaultSrc from '../../images/task.png';
import Utils from '../../utils';

const propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  src: PropTypes.string,
  status: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  src: defaultSrc,
  status: false,
  actions: [],
};

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '30%',
    overflow: 'visible',
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
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.text,
  },
});

class TaskCard extends React.Component {
  state = {
    currentStatus: this.props.status,
    anchorEl: null,
  }

  onToogleStatus = () => {
    this.setState({
      currentStatus: !this.state.currentStatus,
    });
  };

  onMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      userName, email, description,
      actions, classes, src,
    } = this.props;
    const { anchorEl, currentStatus } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography component="h3" className={classes.userName}>
            {userName}
          </Typography>
          <Typography component="h5" className={classes.email}>
            {email}
          </Typography>
          <Typography component="p" className={classes.description}>
            {Utils.cutText(description, 500)}
          </Typography>
        </CardContent>
        {currentStatus ?
          <Badge classes={{ badge: classes.badge }} badgeContent={<CheckCircle />}>
            <CardMedia
              component="img"
              alt="Task Image"
              className={classes.media}
              image={src}
              title="Task Image"
            />
          </Badge> :
          <CardMedia
            component="img"
            alt="Task Image"
            className={classes.media}
            image={src}
            title="Task Image"
          />
        }
        {actions.length > 0 &&
          <CardActions>
            <Tooltip title={currentStatus ? 'Approve' : 'Deselect'}>
              <IconButton
                className={classes.iconButton}
                onClick={this.onToogleStatus}
              >
                {currentStatus ?
                  <CheckCircle color="inherit" /> :
                  <Clear color="inherit" />
                }
              </IconButton>
            </Tooltip>
            <Tooltip title="Actions">
              <IconButton
                aria-owns={anchorEl ? 'action-menu' : undefined}
                aria-haspopup="true"
                className={classes.iconButton}
                onClick={this.onMenuOpen}
              >
                <MoreVert color="inherit" />
              </IconButton>
            </Tooltip>
            <Menu
              id="action-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.onMenuClose}
            >
              {actions.map(item => (
                <MenuItem
                  key={item.label}
                  onClick={Utils.invokeAll(item.onClick, this.onMenuClose)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </CardActions>
        }
      </Card>
    );
  }
}

TaskCard.propTypes = propTypes;
TaskCard.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(TaskCard);
