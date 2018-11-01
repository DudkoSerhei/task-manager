import ACTIONS from '../data/AuthConstants';

const INITIAL_STATE = {
  user: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
