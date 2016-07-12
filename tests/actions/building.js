import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as BuildingActions from '../../app/actions/building';
import { CALL_API } from '../../app/middleware/api';
import * as Types from '../../app/constants/ActionTypes';
import { request } from '../../app/helpers/request';
import { BUILDING_ID } from '../../config.js';
import Schemas from '../../app/schemas';

chai.use(sinonChai);
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('ACTIONS::BUILDING', function() {
	const buildingState = { info: {}, services: {} };
	const etaState = {};

	describe('#retrieveBuilding', function() {
		it('returns updated state', done => {
			const store = mockStore(buildingState);
			store.subscribe(function() {
			expect(store.getState()).to.equal(buildingState);
				done();
			});
			store.dispatch(BuildingActions.retrieveBuilding());
		});
	});
	describe('#fetchBuilding', function() {
		it('returns CALL_API get building', done => {
			const action = BuildingActions.fetchBuilding();
			expect(action[CALL_API]).to.deep.equal({
				types: [Types.SOMETHING_REQUEST, Types.FETCH_BUILDING_SUCCESS, Types.SOMETHING_FAILURE],
				endpoint: `buildings/${BUILDING_ID}`,
				schema: Schemas.BUILDING,
				initRequest: request.get(localStorage.authToken)
			});
			done();
		});
	});

	describe('#findEtaNextTransports', function() {
		it('returns updated state', done => {
			const store = mockStore(etaState);
			store.subscribe(function() {
				expect(store.getState()).to.equal(etaState);
				done();
			});
			store.dispatch(BuildingActions.findEtaNextTransports());
		});
	});
	describe('#fecthEtaNextTransports', function() {
		it('return CALL_API get eta', done => {
			const action = BuildingActions.fecthEtaNextTransports();
			expect(action[CALL_API]).to.deep.equal({
				types: [Types.SOMETHING_REQUEST, Types.GET_ETA_TRANSPORTS_SUCCESS, Types.SOMETHING_FAILURE],
				endpoint: `buildings/${BUILDING_ID}/eta`,
				schema: Schemas.ETA,
				initRequest: request.get(localStorage.authToken)
			});
			done();
		});
	});
});
