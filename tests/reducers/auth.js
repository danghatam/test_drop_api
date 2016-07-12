import { expect } from 'chai';
import AuthReducers from '../../app/reducers/auth';
import * as Types from '../../app/constants/ActionTypes';

describe('REDUCERS::AUTH', function() {
  it('return empty object as default state', done => {
    const action = { type: 'unknown' };
    const initState = {
      isAuthenticated: false,
      user: {}
    };
    const newState = AuthReducers(undefined, action);
    expect(newState).to.deep.equal(initState);
    done();
  });
  it('login success', done => {
    const action = {
      type: Types.LOGIN_SUCCESS,
      response: {
        token: "fake-token-to-test",
        user: {}
      }
    };
    const newState = AuthReducers(undefined, action);
    expect(newState).to.deep.equal({
      isAuthenticated: true,
      user: {}
    });
    expect(localStorage.authToken).to.equal('fake-token-to-test');
    done();
  });
});
