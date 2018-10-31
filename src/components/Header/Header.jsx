import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import PageActions from '../PageActions';

const propTypes = {
  title: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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

function Header({ classes, title }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.button}>
          <DateRange color="inherit" />
        </IconButton>
        <Typography className={classes.title} component="h2">{title}</Typography>
        <PageActions className={classes.actions} />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(Header);
