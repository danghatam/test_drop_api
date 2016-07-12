/* global localStorage: false, console: false */

import { CALL_API } from '../middleware/api';
import * as Types from '../constants/ActionTypes';
import { request } from '../helpers/request';
import { CALLBACK_URL } from '../../config';

export const sendReport = (params) => {
  return {
    [CALL_API]: {
      types: [Types.SOMETHING_REQUEST, Types.REPORTING_SUCCESS, Types.REPORTING_FAILURE],
      endpoint: `/buildings/incidentReports?callback_url=${CALLBACK_URL}`,
      initRequest: request.post(localStorage.authToken, params)
    }
  };
};
export const reportIncident = (params) => {
  return (dispatch, getState) => {
    dispatch(sendReport(params));
  };
};
