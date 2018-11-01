import ACTIONS from '../data/TasksConstants';
import Utils from '../utils';

const INITIAL_STATE = {
  isFetching: false,
  byId: {},
  filters: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_TASKS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ACTIONS.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        byId: Utils.fromArray('id', action.payload.tasks),
        isFetching: false,
      };
    case ACTIONS.FETCH_TASKS_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case ACTIONS.CREATE_TASK_START:
      return {
        ...state,
        isFetching: true,
      };
    case ACTIONS.CREATE_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.payload.task.id]: action.payload.task,
        },
      };
    case ACTIONS.CREATE_TASK_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case ACTIONS.EDIT_TASK_START:
      return {
        ...state,
        isFetching: true,
      };
    case ACTIONS.EDIT_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.payload.task.id]: action.payload.task,
        },
      };
    case ACTIONS.EDIT_TASK_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
