/* global localStorage: false, console: false */

import { CALL_API } from '../middleware/api';
import * as Types from '../constants/ActionTypes';
// import Schemas from '../schemas';
import { request } from '../helpers/request';
import { CALLBACK_URL, FORGOT_PASSWORD_CALLBACK } from '../../config.js';

const handleGetUser = () => {
  return {
    [CALL_API]: {
      types: [Types.SOMETHING_REQUEST, Types.GET_USER_SUCCESS, Types.SOMETHING_FAILURE],
      endpoint: `/users/user`,
      initRequest: request.get(localStorage.authToken)
    }
  };
};

export const getUser = () => {
  return (dispatch, getState) => {
    dispatch(handleGetUser());
  };
};

export const sendRegister = (params) => {
  return {
    [CALL_API]: {
      types: [Types.REGISTER_REQUEST, Types.NOTIFICATION_STATUS, Types.SOMETHING_FAILURE],
      endpoint: `/users/register?callback_url=${CALLBACK_URL}`,
      initRequest: request.post(null, params)
    }
  };
};

export const register = (params) => {
  return (dispatch, getState) => {
    dispatch(sendRegister(params));
  };
};

const handleUpdate = (params) => {
  return {
    [CALL_API]: {
      types: [Types.UPDATE_USER_REQUEST, Types.UPDATE_USER_SUCCESS, Types.UPDATE_USER_FAILURE],
      endpoint: `/users/update?callback_url=${CALLBACK_URL}`,
      initRequest: request.put(localStorage.authToken, params)
    }
  };
};

export const update = (params) => {
  console.log(params);
  return (dispatch, getState) => {
    dispatch(handleUpdate(params));
  };
};

export const sendLogin = (params) => {
  return {
    [CALL_API]: {
      types: [Types.LOGIN_REQUEST, Types.LOGIN_SUCCESS, Types.SOMETHING_FAILURE],
      endpoint: `/auth?callback_url=${CALLBACK_URL}`,
      initRequest: request.post(null, params)
    }
  };
};

export const signin = (params) => {
  return (dispatch, getState) => {
    dispatch(sendLogin(params));
  };
};

// authorize with facebook
const sendFacebookLogin = (token) => {
  return {
    [CALL_API]: {
      types: [Types.FACEBOOK_LOGIN_REQUEST, Types.LOGIN_SUCCESS, Types.SOMETHING_FAILURE],
      endpoint: `/auth/facebook?access_token=${token}`,
      initRequest: request.post(null)
    }
  };
};

export const signinFacebook = (token) => {
  return (dispatch, getState) => {
    dispatch(sendFacebookLogin(token));
  };
};

// authorize with linkedin
const sendLinkedinLogin = (authCode) => {
  return {
    [CALL_API]: {
      types: [Types.LINKEDIN_LOGIN_REQUEST, Types.LOGIN_SUCCESS, Types.SOMETHING_FAILURE],
      endpoint: `/auth/linkedin?code=${authCode}`,
      initRequest: request.post(null)
    }
  };
};

export const signinLinkedin = (authCode) => {
  return (dispatch, getState) => {
    dispatch(sendLinkedinLogin(authCode));
  };
};

// change password
const handleChangePassword = (params) => {
  return {
    [CALL_API]: {
      types: [Types.CHANGE_PASSWORD_REQUEST, Types.CHANGE_PASSWORD_SUCCESS, Types.SOMETHING_FAILURE],
      endpoint: `/users/resetpassword?callback_url=${CALLBACK_URL}`,
      initRequest: request.put(localStorage.authToken, params)
    }
  };
};

export const changePassword = (params) => {
  return (dispatch, getState) => {
    dispatch(handleChangePassword(params));
  };
};

// confirm change password
const handleConfirmChangePassword = (token) => {
  return {
    [CALL_API]: {
      types: [Types.CONFIRM_CALLBACK_REQUEST, Types.CONFIRM_CALLBACK_SUCCESS, Types.CONFIRM_CALLBACK_FAILURE],
      endpoint: `/users/resetpassword/${token}`,
      initRequest: request.get(null)
    }
  };
};

export const confirmChangePassword = (token) => {
  return (dispatch, getState) => {
    dispatch(handleConfirmChangePassword(token));
  };
};

//forgot password
const handleForgetPassword = (params) => {
  return {
    [CALL_API]: {
      types: [Types.SOMETHING_REQUEST, Types.FORGOT_PASSWORD_SUCCESS, Types.SOMETHING_FAILURE],
      endpoint: `/users/forgotpassword?callback_url=${FORGOT_PASSWORD_CALLBACK}`,
      initRequest: request.put(null, params)
    }
  };
};

export const forgetPassword = (params) => {
  return (dispatch, getState) => {
    dispatch(handleForgetPassword(params));
  };
};
//retrieve password
const handleRetrievePassword = (token, params) => {
  return {
    [CALL_API]: {
      types: [Types.SOMETHING_REQUEST, Types.RETRIEVE_PASSWORD_SUCCESS, Types.SOMETHING_FAILURE],
      endpoint: `/users/retrievepassword?resetToken=${token}`,
      initRequest: request.put(null, params)
    }
  };
};

export const retrievePassword = (token, params) => {
  return (dispatch, getState) => {
    dispatch(handleRetrievePassword(token, params));
  };
};

//verify user
const handleVerify = (token, type) => {
  return {
    [CALL_API]: {
      types: [Types.VERIFY_USER_REQUEST, Types.VERIFY_USER_SUCCESS, Types.VERIFY_USER_FAILURE],
      endpoint: `/users/verify/${token}?type=${type}`,
      initRequest: request.get(null)
    }
  };
};

export const verify = (token, type) => {
  return (dispatch, getState) => {
    dispatch(handleVerify(token, type));
  };
};

//terminate token
const handleTerminateToken = (code) => {
  return {
    [CALL_API]: {
      types: [Types.CONFIRM_CALLBACK_REQUEST, Types.CONFIRM_CALLBACK_SUCCESS, Types.CONFIRM_CALLBACK_FAILURE],
      endpoint: `/auth/terminate?code=${code}`,
      initRequest: request.get(null)
    }
  };
};

export const terminateToken = (code) => {
  return (dispatch, getState) => {
    dispatch(handleTerminateToken(code));
  };
};

//verify phone number
const handleVerifyPhoneNumber = (number) => {
  return {
    [CALL_API]: {
      types: [Types.VERIFY_PHONE_NUMBER_REQUEST, Types.VERIFY_PHONE_NUMBER_SUCCESS, Types.VERIFY_PHONE_NUMBER_FAILURE],
      endpoint: `/users/verifyPhoneNumber`,
      initRequest: request.post(localStorage.authToken, {number})
    }
  };
};

export const verifyPhoneNumber = (number) => {
  return (dispatch, getState) => {
    dispatch(handleVerifyPhoneNumber(number));
  };
};

const handleCheckVerifiedNumber = (requestId, code) => {
  console.log(requestId, code);
  return {
    [CALL_API]: {
      types: [Types.CHECK_VERIFY_NUMBER_REQUEST, Types.CHECK_VERIFY_NUMBER_SUCCESS, Types.CHECK_VERIFY_NUMBER_FAILURE],
      endpoint: `/users/verifyPhoneNumber/check?request_id=${requestId}`,
      initRequest: request.post(localStorage.authToken, {code})
    }
  };
};

export const checkVerifiedNumber = (requestId, code) => {
  return (dispatch, getState) => {
    dispatch(handleCheckVerifiedNumber(requestId, code));
  };
};
