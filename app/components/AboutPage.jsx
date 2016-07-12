import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ColorBackground from './Backgrounds/ColorBackground';
import Header from './Header';
import logo from '../assets/images/logo.png';
import pjson from 'json!../../package.json';

class About extends Component {
  render() {
    const year = new Date().getFullYear();
    const version = pjson.version;
    return (
      <ColorBackground>
        <div className='page'>
          <Header
            style={{
              height: '10%'
            }}
            title={<FormattedMessage id='about.title' />}
            menu
            backButton
          />
          <div style={styles.about}>
            <p style={styles.row}>
              <img src={logo} style={styles.logo} />
              <span><FormattedMessage id='about.copyright' values={{year: year}} />,&nbsp;</span>
              <span><FormattedMessage id='about.name' /></span>
            </p>
            <p style={styles.row}><FormattedMessage id='about.contact' /></p>
            <p><FormattedMessage id='about.version' values={{version: version}} /></p>
          </div>
        </div>
      </ColorBackground>
    );
  }
}

const styles = {
  about: {
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
		alignContent: 'space-between',
    justifyContent: 'center'
  },
  logo: {
    height: 50
  },
  row: {
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center'
  }
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(About);
