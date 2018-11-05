import ACTIONS from '../data/TasksConstants';
import Utils from '../utils';

const INITIAL_STATE = {
  isFetching: false,
  taskbyId: {},
  filters: {},
  count: 0,
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
        taskbyId: Utils.fromArray('id', action.payload.tasks),
        isFetching: false,
        count: action.payload.count,
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
        taskbyId: {
          ...state.taskbyId,
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
        taskbyId: {
          ...state.taskbyId,
          [action.payload.id]: {
            ...state.taskbyId[action.payload.id],
            status: action.payload.task.status,
            text: action.payload.task.text,
          },
        },
        message: action.payload.message,
      };
    case ACTIONS.EDIT_TASK_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case ACTIONS.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};
