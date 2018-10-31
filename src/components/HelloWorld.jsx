import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const styles = theme => ({
  button: {
    width: 200,
    color: theme.palette.primary.main,
  },
});

function HelloWorld({ classes }) {
  return (
    <div>
      <Typography variant="h4">Hello world!</Typography>
      <Button className={classes.button}>Click</Button>
    </div>
  );
}

HelloWorld.propTypes = propTypes;

const enhance = withStyles(styles);

export default enhance(HelloWorld);
