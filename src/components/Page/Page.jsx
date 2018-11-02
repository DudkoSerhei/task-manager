import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Header from '../Header';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  title: '',
};

const styles = theme => ({
  container: {
    margin: 0,
    backgroundColor: theme.palette.primary.text,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '92vh',
    padding: '50px 200px',
  },
});

function Page({ classes, title, children }) {
  return (
    <div className={classes.container}>
      {title !== '' && <Header title={title} />}
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

const enhance = withStyles(styles);

export default enhance(Page);
