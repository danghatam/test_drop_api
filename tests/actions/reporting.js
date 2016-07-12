import chai, { expect, should } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ReportingActions from '../../app/actions/reporting';
import { CALL_API } from '../../app/middleware/api';
import * as Types from '../../app/constants/ActionTypes';
import { request } from '../../app/helpers/request';
import { BUILDING_ID, AUTH_TOKEN } from '../../config.js';

chai.use(sinonChai);
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('ACTIONS::REPORTING', function() {
  const reportingState = { isReported: null };
  const params = {
    "building": "5746bc2eef1cca17b1aad6e7",
    "where": "Somewhere",
    "what": "Something",
    "image": "http://www.bdcert.org/assets/images/report_incident.png",
    "extraInfo": "bla bla bla"
  };
  describe('#reportIncident', function() {
    it('returns updated state', done => {
      const store = mockStore(reportingState);
      store.subscribe(function() {
        expect(store.getState()).to.equal(reportingState);
        done();
      });
      store.dispatch(ReportingActions.reportIncident(params));
    });
  });
  describe('#sendReport', function() {
    it('returns CALL_API send report', done => {
      const action = ReportingActions.sendReport(params);
      expect(action[CALL_API]).to.deep.equal({
        types: [Types.SOMETHING_REQUEST, Types.REPORTING_SUCCESS, Types.REPORTING_FAILURE],
        endpoint: `buildings/incidentReports`,
        initRequest: request.post(localStorage.authToken, params)
      });
      done();
    });
  });
});
