import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as UserActions from '../../app/actions/user';
import { CALL_API } from '../../app/middleware/api';
import * as Types from '../../app/constants/ActionTypes';
import { request } from '../../app/helpers/request';

chai.use(sinonChai);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ACTION::USER', function() {
  const userLogin = {
    email: 'tester@local.host',
    password: '12345678'
  };
  const userRegister = {
    firstName: 'tester',
    privateEmail: 'tester@local.host',
    password: '12345678'
  };
  const initState = {};
  afterEach(() => {
    localStorage.clear();
	// remove callback
    localStorage.itemInsertionCallback = null;
  });
  describe('#sendRegister', function() {
    it('returns CALL_API register', done => {
      const action = UserActions.sendRegister(userRegister);
      expect(action[CALL_API]).to.deep.equal({
        types: [Types.SOMETHING_REQUEST, Types.NOTIFICATION_STATUS, Types.SOMETHING_FAILURE],
        endpoint: `users/register`,
        initRequest: request.post(null, userRegister)
      });
      done();
    });
  });
  describe('#register', function() {

    it('called #sendRegister', done => {
      const store = mockStore(initState);
      store.subscribe(function() {
        expect(store.getState()).to.equal(initState);
        done();
      });
      store.dispatch(UserActions.register(userRegister));
    });
  });
  describe('#sendLogin', done => {
    it('return CALL_API authenticate', done => {
      const action = UserActions.sendLogin(userLogin);
      expect(action[CALL_API]).to.deep.equal({
        types: [Types.SOMETHING_REQUEST, Types.LOGIN_SUCCESS, Types.SOMETHING_FAILURE],
        endpoint: `auth`,
        initRequest: request.post(null, userLogin)
      });
      done();
    });
  });
  describe('#signin', function() {
    it('called #sendLogin', done => {
      const store = mockStore(initState);
      store.subscribe(function() {
        expect(store.getState()).to.equal(initState);
        done();
      });
      store.dispatch(UserActions.signin(userLogin));
    });
  });
});
