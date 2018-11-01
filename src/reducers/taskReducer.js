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
    default:
      return state;
  }
};
