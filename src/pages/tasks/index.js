import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page';
import TaskCard from '../../components/TaskCard';
import Pagination from '../../components/Pagination';
import { CreateTaskDialog } from '../../components/Dialogs';
import { TaskShape, UserShape } from '../../shapes';
import { fetchTasks } from '../../actions';
import { all, fetchingStatus, totalCount } from '../../selectors';

const propTypes = {
  isFetching: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.shape(TaskShape)),
  fetchTasks: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(PropTypes.string),
  user: PropTypes.shape(UserShape),
  count: PropTypes.number,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const defaultProps = {
  tasks: [],
  filters: {},
  user: {},
  isFetching: false,
  count: 0,
};

const styles = theme => ({
  card: {
    marginBottom: '30px',
    maxHeight: '160px',
    '&:last-child': {
      marginBottom: 0,
    },
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
    marginTop: 'auto',
  },
});

class TasksPage extends React.Component {
  state = {
    isOpen: false,
    currentPage: 1,
  }

  componentDidMount() {
    const { currentPage } = this.state;

    const data = {
      page: currentPage,
    };

    console.log(this.props.filters);

    this.props.fetchTasks(data);
  }

  // componentDidUpdate() {
  //   const { filters } = this.props;
  //   const { currentPage } = this.state;

  //   const data = {
  //     page: currentPage,
  //     sortField: filters.filter,
  //     sort_direction: filters.sort,
  //   };

  //   this.props.fetchTasks(data);
  // }

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
    const {
      classes, tasks, user,
      isFetching, count,
    } = this.props;
    const { isOpen, currentPage } = this.state;

    console.log(tasks, 'tasks');

    return (
      <Page title="Tasks">
        {!isFetching ?
          tasks.map(task => (
            <TaskCard
              key={task.id}
              classes={{ card: classes.card }}
              id={task.id}
              userName={task.username}
              email={task.email}
              description={task.text}
              src={task.image_path}
              status={task.status}
              edit={Object.keys(user).length !== 0}
            />
          )) :
          <CircularProgress className={classes.progress} />
        }
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
          count={count}
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
  isFetching: fetchingStatus(state),
  count: totalCount(state),
});

const dispatchToProps = {
  fetchTasks,
};

const enhance = compose(
  withStyles(styles),
  connect(stateToProps, dispatchToProps),
);

export default enhance(TasksPage);
