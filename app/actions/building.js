/* global localStorage: false, console: false */

import { CALL_API } from '../middleware/api';
import * as Types from '../constants/ActionTypes';
import Schemas from '../schemas';
import { request } from '../helpers/request';

export const fetchBuilding = () => {
	const id = localStorage.buildingId;
	return {
		[CALL_API]: {
			types: [Types.FETCH_BUILDING_REQUEST, Types.FETCH_BUILDING_SUCCESS, Types.SOMETHING_FAILURE],
			endpoint: `/buildings/${id}`,
			schema: Schemas.BUILDING,
			initRequest: request.get(localStorage.authToken)
		}
	};
};
export const retrieveBuilding = () => {
	return (dispatch, getState) => {
		dispatch(fetchBuilding());
	};
};

export const fecthEtaNextTransports = () => {
	const id = localStorage.buildingId;
	return {
		[CALL_API]: {
			types: [Types.ETA_TRANSPORTS_REQUEST, Types.ETA_TRANSPORTS_SUCCESS, Types.SOMETHING_FAILURE],
			endpoint: `/buildings/${id}/eta`,
			schema: Schemas.ETA,
			initRequest: request.get(localStorage.authToken)
		}
	};
};
export const findEtaNextTransports = () => {
	return (dispatch, getState) => {
		dispatch(fecthEtaNextTransports());
	};
};

//get all buildings
const handleGetAll = () => {
	return {
		[CALL_API]: {
			types: [Types.GET_ALL_BUILDING_REQUEST, Types.GET_ALL_BUILDING_SUCCESS, Types.SOMETHING_FAILURE],
			endpoint: `/buildings/search?input=`,
			initRequest: request.get(localStorage.authToken)
		}
	};
};

export const getAll = () => {
	return (dispatch, getState) => {
		dispatch(handleGetAll());
	};
};

//search buildings
const handleSearchBuilding = (input) => {
	const searchStr = encodeURIComponent(input);
	return {
		[CALL_API]: {
			types: [Types.SOMETHING_REQUEST, Types.SEARCH_BUILDING_SUCCESS, Types.SOMETHING_FAILURE],
			endpoint: `/buildings/search?input=${searchStr}`,
			initRequest: request.get(localStorage.authToken)
		}
	};
};

export const searchBuilding = (input) => {
	return (dispatch, getState) => {
		dispatch(handleSearchBuilding(input));
	};
};

//find next to me
const distance = 0.2;
const handleNextToMe = (lat, long) => {
	return {
		[CALL_API]: {
			types: [Types.SOMETHING_REQUEST, Types.SEARCH_BUILDING_SUCCESS, Types.SOMETHING_FAILURE],
			endpoint: `/buildings/nexttome?lat=${lat}&long=${long}&distance=${distance}`,
			initRequest: request.get(localStorage.authToken)
		}
	};
};

export const nextToMe = (lat, long) => {
	return (dispatch, getState) => {
		dispatch(handleNextToMe(lat, long));
	};
};

//select building
const handleSelectBuilding = (id) => {
	return {
		type: Types.SELECT_BUILDING,
		id
	};
};

export const selectBuilding = (id) => {
	return (dispatch, getState) => {
		dispatch(handleSelectBuilding(id));
	};
};
