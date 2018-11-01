import ACTIONS from '../data/AuthConstants';

export default function setUser(user) {
  return { type: ACTIONS.SET_USER, user };
}
