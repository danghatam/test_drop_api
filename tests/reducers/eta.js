import { expect } from 'chai';
import EtaReducers from '../../app/reducers/eta';
import * as Types from '../../app/constants/ActionTypes';

describe('REDUCERS::ETA', function() {
	it('return empty object as default state', done => {
		const action = {type: 'unknow'};
		const newState = EtaReducers(undefined, action);
		expect(newState).to.deep.equal({});
		done();
	});
	it('find eta next transports', done => {
		const action = {
			type: Types.GET_ETA_TRANSPORTS_SUCCESS,
			response: {
				entities: {
					etas: {
						undefined: {
							"bus": [
								{
									"line": "57",
									"direction": "PORTE DE BAGNOLET (Paris)",
									"eta": 3
								}
							]
						}
					}
				},
				result: "12345678"
			}
		};
		const newState = EtaReducers(undefined, action);
		expect(newState).to.deep.equal({
			"bus": [
				{
					"line": "57",
					"direction": "PORTE DE BAGNOLET (Paris)",
					"eta": 3
				}
      ]
		});
		done();
	});
});
