import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';

const propTypes = {
  direction: PropTypes.string,
};

const defaultProps = {
  direction: 'up',
};

function Transition(props) {
  const { direction } = props;

  return <Slide direction={direction} {...props} />;
}

Transition.propTypes = propTypes;
Transition.defaultProps = defaultProps;

export default Transition;
