import merge from 'lodash/merge';
import * as Types from '../constants/ActionTypes';

const reporting = (state = { isReported: null }, action) => {
  switch (action.type) {
    case Types.REPORTING_SUCCESS:
      return merge({}, state, { isReported: true });
    case Types.REPORTING_FAILURE:
      return merge({}, state, { isReported: false });
    default: return merge({}, state, { isReported: null });
  }
};

export default reporting;
