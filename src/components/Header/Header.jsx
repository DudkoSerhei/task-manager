import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import PageActions from '../PageActions';

const propTypes = {
  title: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {
  title: '',
};

const styles = theme => ({
  title: {
    color: theme.palette.primary.text,
    fontSize: '1.8rem',
  },
  button: {
    marginRight: '10px',
    color: theme.palette.primary.text,
  },
  actions: {
    marginLeft: 'auto',
  },
});

function Header({ classes, title, history }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Tooltip title="Logo">
          <IconButton onClick={() => history.push('/')} className={classes.button}>
            <DateRange color="inherit" />
          </IconButton>
        </Tooltip>
        <Typography className={classes.title} component="h2">{title}</Typography>
        <PageActions className={classes.actions} />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(Header);
