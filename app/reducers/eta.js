import merge from 'lodash/merge';
import * as Types from '../constants/ActionTypes';

const eta = (state = {}, action) => {
	switch (action.type) {
		case Types.ETA_TRANSPORTS_SUCCESS:
			const etas = action.response.entities.etas;
			return merge({}, state, etas[Object.keys(etas)[0]]);
    default: return state;
	}
};

export default eta;
