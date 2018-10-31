import {
  GET_TASKS_START,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
} from '../actions/taskAction';

const INITIAL_STATE = {
  tasks: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_START:
      return state;
    case GET_TASKS_SUCCESS:
      return state;
    case GET_TASKS_ERROR:
      return state;
    default:
      return state;
  }
};
