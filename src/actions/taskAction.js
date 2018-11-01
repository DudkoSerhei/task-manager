import axios from 'axios';
import { API_URL } from '../env';
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
  const data = {
    page,
    sort_direction: sortDirection,
    sort_field: sortField,
  };

  dispatch(fetchTasksStart());
  axios.get(`${API_URL}`, { data })
    .then((response) => {
      dispatch(fetchTasksSuccess(response.data));
    })
    .catch(error => dispatch(fetchTasksError(error)));
};

export function setFilters(filters) {
  return { type: ACTIONS.SET_FILTERS, filters };
}
