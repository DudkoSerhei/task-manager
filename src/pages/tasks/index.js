import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page';
import TaskCard from '../../components/TaskCard';
import { CreateTaskDialog } from '../../components/Dialogs';
import Fixtures from './Fixtures';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
});

class TasksPage extends React.Component {
  state = {
    isCreateDialogOpen: false,
  }

  onCreateDialogOpen = () => {
    this.setState({
      isCreateDialogOpen: true,
    });
  };

  onCreateDialogClose = () => {
    this.setState({
      isCreateDialogOpen: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { isCreateDialogOpen } = this.state;

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
        <Tooltip title="Create Task">
          <Button
            variant="fab"
            className={classes.button}
            onClick={this.onCreateDialogOpen}
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <CreateTaskDialog
          isOpen={isCreateDialogOpen}
          onClose={this.onCreateDialogClose}
        />
      </Page>
    );
  }
}

TasksPage.propTypes = propTypes;

const enhance = withStyles(styles);

export default enhance(TasksPage);
