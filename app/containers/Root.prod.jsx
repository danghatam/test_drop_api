import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IntlProvider } from 'react-intl';
import routes from '../routes';
import { Theme } from '../theme';
import enMessages from '../locales/en';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS } from '../../config';

ReactGA.initialize(GOOGLE_ANALYTICS.TRACK_ID);

export default class Root extends Component {
  constructor() {
    super();
    // init locale
    this.locale = 'en';
  }

  messages(locale) {
    switch (locale) {
      case 'en':
        return enMessages;
      default: return {};
    }
  }

  logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    const { store, history } = this.props;
    const messages = this.messages(this.locale);
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={Theme}>
          <IntlProvider locale={this.locale} messages={messages}>
            <Router history={history} routes={routes} onUpdate={this.logPageView} />
          </IntlProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
