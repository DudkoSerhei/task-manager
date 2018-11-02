import { createSelector } from 'reselect';

const tasks = state => state.tasks;
const fetchingStatus = createSelector(tasks, state => state.isFetching);
const byId = createSelector(tasks, state => state.byId);
const all = createSelector(byId, state => Object.values(state));
const getById = id => createSelector(byId, state => state[id]);
const totalCount = createSelector(tasks, state => +state.count);

export {
  fetchingStatus,
  all,
  getById,
  totalCount,
};
