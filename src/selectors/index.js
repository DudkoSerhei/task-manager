import { createSelector } from 'reselect';

const tasks = state => state.tasks;
const fetchingStatus = createSelector(tasks, state => state.isFetching);
const taskbyId = createSelector(tasks, state => state.taskbyId);
const all = createSelector(taskbyId, state => Object.values(state));
const getById = id => createSelector(taskbyId, state => state[id]);
const totalCount = createSelector(tasks, state => +state.count);

export {
  fetchingStatus,
  all,
  getById,
  totalCount,
};
