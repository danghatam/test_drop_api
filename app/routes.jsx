import React from 'react';
import { Route, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProblemReportPage,
  MobilityPage,
  LivePage,
  AboutPage,
  HelpPage,
  BuildingListPage,
  ServiceListPage,
  ServicePage,
  ChangePasswordPage,
  ForgotPasswordPage,
  RetrievePasswordPage,
  CallbackPage,
  SettingPage,
  VerifiedNumberPage
} from './components';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

//google analytics
// authorization
const requireAuth = (nextState, replace) => {
  if (!localStorage.authToken) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const routes = (
    <Route>
      <Route path='/' component={HomePage} onEnter={requireAuth} />
      <Route path='login' component={LoginPage} />
      <Route path='register' component={RegisterPage} />
      <Route path='change-password' component={ChangePasswordPage} onEnter={requireAuth} />
      <Route path='forgot-password' component={ForgotPasswordPage} />
      <Route path='retrieve-password' component={RetrievePasswordPage} />
      <Route path='callback' component={CallbackPage} />
      <Route path='report' component={ProblemReportPage} onEnter={requireAuth} />
      <Route path='mobility' component={MobilityPage} onEnter={requireAuth} />
      <Route path='live' component={LivePage} onEnter={requireAuth} />
      <Route path='about' component={AboutPage} onEnter={requireAuth} />
      <Route path='help' component={HelpPage} onEnter={requireAuth} />
      <Route path='select-building' component={BuildingListPage} onEnter={requireAuth} />
      <Route path='services' onEnter={requireAuth}>
        <IndexRoute component={ServiceListPage} />
        <Route path=':id' component={ServicePage} />
      </Route>
      <Route path='settings' component={SettingPage} onEnter={requireAuth} />
      <Route path='verify-phone-number' component={VerifiedNumberPage} onEnter={requireAuth} />
    </Route>
);

export default routes;
