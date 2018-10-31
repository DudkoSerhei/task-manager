import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Page from '../../components/Page';
import TaskCard from '../../components/TaskCard';
import Fixtures from './Fixtures';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const styles = theme => ({
  button: {
    width: 200,
    color: theme.palette.primary.main,
  },
});

function TasksPage({ classes }) {
  return (
    <Page title="Tasks">
      {Fixtures.tasks.map(task => (
        <TaskCard
          key={task.id}
          userName={task.userName}
          email={task.email}
          description={task.description}
          src={task.src}
          status={task.status}
        />
      ))}
    </Page>
  );
}

TasksPage.propTypes = propTypes;

const enhance = withStyles(styles);

export default enhance(TasksPage);
