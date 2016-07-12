import merge from 'lodash/merge';
import * as Types from '../constants/ActionTypes';

const initState = {
  info: {},
  user: {},
  manager: {}
};
const service = (state = initState, action) => {
  switch (action.type) {
    case Types.SERVICE_SUCCESS:
      const info = action.response.entities.services[action.response.result];
      const user = action.response.entities.user ? action.response.entities.user[info.owner] : {};
      const manager = action.response.entities.manager;
      return merge({}, state, {info, user, manager});
    default: return merge({}, state);
  }
};

export default service;
