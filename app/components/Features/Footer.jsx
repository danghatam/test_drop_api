import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import RetinaImage from 'react-retina-image';
import logo from '../../assets/images/logo_footer.png';

class Footer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.footer}>
          <RetinaImage src={[logo]} style={styles.logo} />
          <span>
            <FormattedMessage id='footer' />
            <a style={styles.link} href='https://flatturtle.com'> FlatTurtle</a>
          </span>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: 11
  },
  footer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 36,
    height: 36
  },
  link: {
    textDecoration: 'none',
    color: '#fff'
  }
};

export default Footer;
