/* global localStorage: false, console: false */

import merge from 'lodash/merge';
import * as Types from '../constants/ActionTypes';

const building = (state = { current: {}, services: {}, list: [] }, action) => {
	switch (action.type) {
		case Types.FETCH_BUILDING_SUCCESS:
			const res = {
				current: action.response.entities.buildings[action.response.result],
				services: action.response.entities.services
			};
			return merge({}, state, res);
		case Types.GET_ALL_BUILDING_SUCCESS:
			state.list = merge([], action.response);
			return merge({}, state);
		case Types.SEARCH_BUILDING_SUCCESS:
			state.list = merge([], action.response);
			return merge({}, state);
		case Types.SELECT_BUILDING:
			localStorage.setItem('buildingId', action.id);
			return state;
    default: return state;
	}
};

export default building;
