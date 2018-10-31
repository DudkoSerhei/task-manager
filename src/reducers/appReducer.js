import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

const appReducer = combineReducers({
  tasks: taskReducer,
});

export default appReducer;
