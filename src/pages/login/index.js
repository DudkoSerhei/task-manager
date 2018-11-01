import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Page from '../../components/Page';
import LoginForm from '../../components/LoginForm';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const styles = {
  content: {
    height: '92vh',
  },
};

function LoginPage({ classes }) {
  return (
    <Page classes={{ content: classes.content }} title="Login">
      <LoginForm />
    </Page>
  );
}

LoginPage.propTypes = propTypes;

const enhance = withStyles(styles);

export default enhance(LoginPage);
