import axios from 'axios';
import { API_URL, DEVELOPER } from '../env';
import ACTIONS from '../data/TasksConstants';

export const fetchTasksStart = () => ({
  type: ACTIONS.FETCH_TASKS_START,
});

export const fetchTasksSuccess = tasks => ({
  type: ACTIONS.FETCH_TASKS_SUCCESS,
  payload: {
    tasks,
  },
});

export const fetchTasksError = error => ({
  type: ACTIONS.FETCH_TASKS_ERROR,
  payload: {
    error,
  },
});

export const fetchTasks = (page, sortDirection, sortField) => (dispatch) => {
  const params = {
    page,
    sort_direction: sortDirection,
    sort_field: sortField,
  };

  dispatch(fetchTasksStart());
  axios.get(`${API_URL}/${DEVELOPER}`, { params })
    .then((response) => {
      dispatch(fetchTasksSuccess(response.data));
    })
    .catch(error => dispatch(fetchTasksError(error)));
};

export function setFilters(filters) {
  return { type: ACTIONS.SET_FILTERS, filters };
}

export const createTaskStart = () => ({
  type: ACTIONS.CREATE_TASK_START,
});

export const createTaskSuccess = task => ({
  type: ACTIONS.CREATE_TASK_SUCCESS,
  payload: {
    task,
  },
});

export const createTaskError = error => ({
  type: ACTIONS.CREATE_TASK_ERROR,
  payload: {
    error,
  },
});

export const createTask = task => (dispatch) => {
  const data = {
    username: task.username,
    email: task.email,
    text: task.text,
    image: task.image,
  };

  dispatch(createTaskStart());
  axios.post(`${API_URL}/create/${DEVELOPER}`, data)
    .then((response) => {
      dispatch(createTaskSuccess(response.data));
    })
    .catch(error => dispatch(createTaskError(error)));
};

export const editTaskStart = () => ({
  type: ACTIONS.EDIT_TASK_START,
});

export const editTaskSuccess = task => ({
  type: ACTIONS.EDIT_TASK_SUCCESS,
  payload: {
    task,
  },
});

export const editTaskError = error => ({
  type: ACTIONS.EDIT_TASK_ERROR,
  payload: {
    error,
  },
});

export const editTask = (id, task) => (dispatch) => {
  const data = {
    status: task.status,
    text: task.text,
  };

  dispatch(editTaskStart());
  axios.post(`${API_URL}/edit/${id}/${DEVELOPER}`, data)
    .then((response) => {
      dispatch(editTaskSuccess(response.data));
    })
    .catch(error => dispatch(editTaskError(error)));
};
