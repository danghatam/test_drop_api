import { expect } from 'chai';
import BuildingReducers from '../../app/reducers/building';
import * as Types from '../../app/constants/ActionTypes';

describe('REDUCERS::BUILDING', function() {
	it('return empty object as default state', done => {
		const action = {type: 'unknown'};
		const initState = {
			current: {},
			services: {},
			search: []
		};
		const newState = BuildingReducers(undefined, action);
		expect(newState).to.deep.equal(initState);
		done();
	});
	it('retrieve a building success', done => {
		const action = {
			type: Types.FETCH_BUILDING_SUCCESS,
			response: {
				entities: {
					buildings:
					{
						"12345678": {
							"name": "my building",
							"geolocation": [51.505, -0.09],
							"_id": "57442f437a29dd125f4d20cf",
							"manager": [],
							"services": [],
							"address": {}
						}
					},
					services: {}
				},
				result: "12345678"
			}
		};
		const newState = BuildingReducers(undefined, action);
		expect(newState).to.deep.equal({
			current: {
				"name": "my building",
				"geolocation": [51.505, -0.09],
				"_id": "57442f437a29dd125f4d20cf",
				"manager": [],
				"services": [],
				"address": {}
			},
			services: {},
			search: []
		});
		done();
	});
});
