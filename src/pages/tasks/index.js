import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page';
import TaskCard from '../../components/TaskCard';
import Pagination from '../../components/Pagination';
import { CreateTaskDialog } from '../../components/Dialogs';
import { TaskShape, UserShape } from '../../shapes';
import { fetchTasks } from '../../actions';
import { all } from '../../selectors';
import Fixtures from './Fixtures';

const propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape(TaskShape)),
  fetchTasks: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(PropTypes.string),
  user: PropTypes.shape(UserShape),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  tasks: [],
  filters: {},
  user: {},
};

const styles = theme => ({
  card: {
    marginBottom: '30px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  cardAdmin: {
    height: '230px',
  },
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
  pagination: {
    marginTop: '50px',
  },
});

class TasksPage extends React.Component {
  state = {
    isOpen: false,
    currentPage: 1,
  }

  componentDidMount() {
    this.props.fetchTasks(this.state.currentPage);
  }

  componentDidUpdate() {
    const { filters } = this.props;
    const { currentPage } = this.state;

    const data = {
      page: currentPage,
      sortField: filters.filter,
      sort_direction: filters.sort,
    };

    this.props.fetchTasks(data);
  }

  handleDialogOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handlePageLeft = () => {
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  };

  handlePageRight = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  };

  handlePageClick = (currentPage) => {
    this.setState({ currentPage });
  };

  render() {
    const { classes, tasks, user } = this.props;
    const { isOpen, currentPage } = this.state;

    const cardClassName = cn(classes.card, {
      [classes.cardAdmin]: Object.keys(user).length !== 0,
    });
    console.log(tasks, 'tasks');

    return (
      <Page title="Tasks">
        {Fixtures.tasks.map(task => (
          <TaskCard
            key={task.id}
            classes={{ card: cardClassName }}
            id={task.id}
            userName={task.userName}
            email={task.email}
            description={task.description}
            src={task.src}
            status={task.status}
            edit={Object.keys(user).length !== 0}
          />
        ))}
        <Tooltip title="Create Task">
          <Button
            variant="fab"
            className={classes.button}
            onClick={this.handleDialogOpen}
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <CreateTaskDialog
          isOpen={isOpen}
          onClose={this.handleDialogClose}
        />
        <Pagination
          currentPage={currentPage}
          count={12}
          onBackward={this.handlePageLeft}
          onForward={this.handlePageRight}
          onPageClick={this.handlePageClick}
          classes={{ container: classes.pagination }}
        />
      </Page>
    );
  }
}

TasksPage.propTypes = propTypes;
TasksPage.defaultProps = defaultProps;

const stateToProps = state => ({
  tasks: all(state),
  filters: state.tasks.filters,
  user: state.auth.user,
});

const dispatchToProps = {
  fetchTasks,
};

const enhance = compose(
  withStyles(styles),
  connect(stateToProps, dispatchToProps),
);

export default enhance(TasksPage);
