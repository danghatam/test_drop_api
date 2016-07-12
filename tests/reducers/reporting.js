import { expect } from 'chai';
import ReportingReducers from '../../app/reducers/reporting';
import * as Types from '../../app/constants/ActionTypes';

describe('REDUCERS::REPORTING', function() {
  it('return empty object as default state', done => {
    const action = { type: 'unknown' };
    const initState = { isReported: null };
    const newState = ReportingReducers(undefined, action);
    expect(newState).to.deep.equal(initState);
    done();
  });
  it('send report success', done => {
    const action = {
      type: Types.REPORTING_SUCCESS,
      response: {}
    };
    const newState = ReportingReducers(undefined, action);
    expect(newState).to.deep.equal({isReported: true});
    done();
  });
  it('send report failure', done => {
    const action = {
      type: Types.REPORTING_FAILURE,
      response: {}
    };
    const newState = ReportingReducers(undefined, action);
    expect(newState).to.deep.equal({isReported: false});
    done();
  });
});
