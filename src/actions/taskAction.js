import axios from 'axios';
import { API_URL, DEVELOPER } from '../env';
import ACTIONS from '../data/TasksConstants';
import Utils from '../utils';

export const fetchTasksStart = () => ({
  type: ACTIONS.FETCH_TASKS_START,
});

export const fetchTasksSuccess = message => ({
  type: ACTIONS.FETCH_TASKS_SUCCESS,
  payload: {
    tasks: message.tasks,
    count: message.total_task_count,
  },
});

export const fetchTasksError = error => ({
  type: ACTIONS.FETCH_TASKS_ERROR,
  payload: {
    error,
  },
});

export const fetchTasks = params => (dispatch) => {
  dispatch(fetchTasksStart());
  axios.get(`${API_URL}/${DEVELOPER}`, { params })
    .then((response) => {
      dispatch(fetchTasksSuccess(response.data.message));
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
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  dispatch(createTaskStart());
  axios.post(`${API_URL}/create/${DEVELOPER}`, task, config)
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
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const data = Utils.sortData(task);

  dispatch(editTaskStart());
  axios.post(`${API_URL}/edit/${id}/${DEVELOPER}`, data, config)
    .then((response) => {
      dispatch(editTaskSuccess(response.data));
    })
    .catch(error => dispatch(editTaskError(error)));
};
