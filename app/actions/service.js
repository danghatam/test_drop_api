/* global localStorage: false, console: false */

import { CALL_API } from '../middleware/api';
import * as Types from '../constants/ActionTypes';
import Schemas from '../schemas';
import { request } from '../helpers/request';

const requestService = (id) => {
  return {
    [CALL_API]: {
      types: [Types.SOMETHING_REQUEST, Types.SERVICE_SUCCESS, Types.SOMETHING_FAILURE],
      endpoint: `/services/${id}`,
      schema: Schemas.SERVICE,
      initRequest: request.get(localStorage.authToken)
    }
  };
};

export const retrieveService = (id) => {
  return (dispatch, getState) => {
    dispatch(requestService(id));
  };
};
