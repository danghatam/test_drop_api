import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { signinLinkedin } from '../../actions/user';
import { LINKEDIN } from '../../../config';

class LinkedinButton extends Component {

  constructor(props) {
    super(props);
    if (props.code) {
      window.opener.handlePopupResult(props.code);
      window.close();
    }
  }

  getAccessToken(code) {
    this.props.signinLinkedin(code);
  }

  handleSignIn () {
    //
    window.handlePopupResult = (code) => {
      this.props.onWaiting();
      this.getAccessToken(code);
    };

    window.open(
      `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code&client_id=${LINKEDIN.APP_ID}&redirect_uri=${LINKEDIN.AUTHORIZATION_REDIRECT}` +
      `&state=${LINKEDIN.STATE_CODE}&scope=${LINKEDIN.SCOPE}`,
      'Linkedin Authorization',
      `width=600,height=500`
    );
  }

  render() {
    return (
      <RaisedButton
        label={<FormattedMessage id='login.linkedinButton' />}
        secondary
        fullWidth
        onTouchTap={this.handleSignIn.bind(this)}
        icon={<FontIcon className='fa fa-linkedin-square' />}
        style={{marginTop: 10}}
      />
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { signinLinkedin })(LinkedinButton);
