import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import authReducer from './authReducer';

const appReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
});

export default appReducer;
