/* global localStorage: false, console: false */

import merge from 'lodash/merge';
import * as Types from '../constants/ActionTypes';

const auth = (state = {
  isAuthenticated: !!localStorage.authToken,
  isConfirmed: false,
  isUpdated: false,
  user: localStorage.getObject('user'),
  waitingConfirm: null,
  phoneNumber: {
    isWaitingConfirm: false,
    isVerified: false,
    number: null
  }
}, action) => {
  switch (action.type) {

    case Types.LOGIN_SUCCESS:
      localStorage.setItem('authToken', action.response.token);
      localStorage.setObject('user', action.response.user);
      return merge({}, state, { isAuthenticated: true, user: action.response.user });

    case Types.GET_USER_SUCCESS:
      localStorage.setObject('user', action.response);
      return merge({}, state, { user: action.response });

    case Types.CHANGE_PASSWORD_SUCCESS:
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return merge({}, state, { isAuthenticated: false, waitingConfirm: true });
    case Types.FORGOT_PASSWORD_SUCCESS:
    case Types.RETRIEVE_PASSWORD_SUCCESS:
      return merge({}, state, { waitingConfirm: true });

    case Types.CONFIRM_CALLBACK_SUCCESS:
      // localStorage.removeItem('authToken');
      // localStorage.removeItem('user');
      return merge({}, state, {isConfirmed: true});

    case Types.CONFIRM_CALLBACK_FAILURE:
      return merge({}, state, {isConfirmed: false});

    case Types.UPDATE_USER_SUCCESS:
      localStorage.setObject('user', action.response);
      return merge({}, state, {user: action.response, isUpdated: true});

    case Types.VERIFY_USER_SUCCESS:
      const user = merge({}, state.user, action.response);
      localStorage.setObject('user', user);
      return merge({}, state, {isConfirmed: true, user: user});

    case Types.VERIFY_USER_FAILURE:
      return merge({}, state, {isConfirmed: false});

    case Types.VERIFY_PHONE_NUMBER_SUCCESS:
      console.log(action.response);
      const veriedPhone = {
        isWaitingConfirm: true,
        requestId: action.response.requestId,
        number: action.response.phoneNumber
      };
      return merge({}, state, {phoneNumber: veriedPhone});

    case Types.CHECK_VERIFY_NUMBER_SUCCESS:
      const checkedPhone = {
        isWaitingConfirm: false,
        isVerified: true
      };
      return merge({}, state, {phoneNumber: checkedPhone});

    default: return merge({}, state, {
      waitingConfirm: false,
      isConfirmed: false,
      isUpdated: false
    });
  }
};
export default auth;
