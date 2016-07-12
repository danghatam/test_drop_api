import apiMiddleware, { CALL_API } from '../../app/middleware/api';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import nock from 'nock';
import * as Types from '../../app/constants/ActionTypes';
import Schemas from '../../app/schemas';
import { request } from '../../app/helpers/request';
import { BUILDING_ID, AUTH_TOKEN, API_ROOT } from '../../config';

chai.use(sinonChai);

describe('MIDDLEWARE::API', function() {
	let store, next, action;
	beforeEach(done => {
		store = {};
		next = sinon.stub();
		action = {
			[CALL_API]: {
				types: [Types.SOMETHING_REQUEST, Types.FETCH_BUILDING_SUCCESS, Types.SOMETHING_FAILURE],
				endpoint: `buildings/${BUILDING_ID}`,
				schema: Schemas.BUILDING,
				initRequest: request.get(AUTH_TOKEN)
			}
		};
		done();
	});
	afterEach(function() {
    nock.cleanAll();
  });
	describe('when action is without CALL_API', function() {
		it('passes the action to next middleware', done => {
			action = {
				type: 'not-CALL_API'
			};
			apiMiddleware(store)(next)(action);
			expect(next).to.have.been.calledWith(action);
			done();
		});
	});
	describe('when action is with CALL_API', function() {
		let nockScope;
		beforeEach(done => {
			nockScope = nock(API_ROOT).get(`buildings/${BUILDING_ID}`);
			done();
		});
		it('resolves returned promise when response when success', done => {
			nockScope = nockScope.reply(200, {status: 'ok'});
			const promise = apiMiddleware(store)(next)(action);
			expect(promise).to.be.fulfilled;
			done();
		});
		it('dispatch successType with response when success', done => {
      nockScope = nockScope.reply(200, { status: 'ok' });
      let promise = apiMiddleware(store)(next)(action);

      promise.then(() => {
        expect(next).to.have.been.calledWith({
          type: Types.FETCH_BUILDING_SUCCESS,
          response: { status: 'ok' }
        }, done());
      });
    });
	});
});
