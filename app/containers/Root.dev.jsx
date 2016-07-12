import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from '../routes';
import DevTools from './DevTools';
import { Theme } from '../theme';
import { IntlProvider } from 'react-intl';
import * as localeMessage from '../locales';

class Root extends Component {

  getMessages(locale) {
    switch (locale) {
      case 'en':
        return localeMessage.en;
      case 'fr':
        return localeMessage.fr;
      case 'nl':
        return localeMessage.nl;
      default:
        return localeMessage.en;
    }
  }

  render() {
    const { store, history, index } = this.props;
    const messages = this.getMessages(index.locale);
    return (
      <Provider store={store}>
        <div className='full-height'>
          <MuiThemeProvider muiTheme={Theme}>
            <IntlProvider locale={index.locale} messages={messages}>
              <Router history={history} routes={routes} />
            </IntlProvider>
          </MuiThemeProvider>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    index: state.index
  };
};

export default connect(mapStateToProps)(Root);
