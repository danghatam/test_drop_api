/* global localStorage: false, console: false, Storage: false */

import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import building from './building';
import eta from './eta';
import auth from './auth';
import reporting from './reporting';
import service from './service';
import * as Types from '../constants/ActionTypes';

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
  return JSON.parse(this.getItem(key));
};

const getLocale = () => {
  if (!localStorage.getObject('user')) {
    return 'en';
  } else return localStorage.getObject('user').language;
};

const iniState = {
	isFetching: false,
	error: null,
	status: false,
	locale: getLocale()
};

const index = (state = iniState, action) => {
	switch (action.type) {
		case Types.SOMETHING_REQUEST:
			return merge({}, state, { isFetching: true });

		case Types.SOMETHING_FAILURE:
			if (action.error.status === 403 && !!localStorage.authToken) {
				localStorage.removeItem('authToken');
			}
			return merge({}, state, { isFetching: false, error: action.error.status });

		case Types.NOTIFICATION_STATUS:
			return merge({}, state, { isFetching: false, status: true });

		case Types.RESET_INDEX:
			return merge({}, state, { isFetching: false, error: null, status: false });

		case Types.CHANGE_LOCALE:
			return merge({}, state, {locale: action.locale});

		default:
			return merge({}, state, { isFetching: false, error: null, status: false });
	}
};

const rootReducer = combineReducers({
	index,
	auth,
	building,
	eta,
	reporting,
	service,
  routing
});

export default rootReducer;
