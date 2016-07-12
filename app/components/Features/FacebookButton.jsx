/* global FB: false */

import React, { Component} from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { signinFacebook } from '../../actions/user';
import { FACEBOOK } from '../../../config';

class FacebookButton extends Component {
  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: FACEBOOK.APP_ID,
        cookie: true,  // enable cookies to allow the server to access
                          // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.1' // use version 2.1
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      // FB.getLoginStatus(function(response) {
      //   this.statusChangeCallback(response);
      // }.bind(this));

      //subscribe event login
      FB.Event.subscribe('auth.login', function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  statusChangeCallback(response) {
    // console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.props.signinFacebook(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log(response.status);
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log(response.status);
    }
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleClick() {
    this.props.onWaiting();
    FB.login(this.checkLoginState(),  {scope: 'public_profile,email'});
  }

  render() {
    return (
      <RaisedButton
        label={<FormattedMessage id='login.facebookButton' />}
        secondary={true}
        fullWidth={true}
        icon={<FontIcon className='fa fa-facebook-official' />}
        style={styles.button}
        onTouchTap={this.handleClick.bind(this)}
      />
    );
  }
}

const styles = {
  button: {
    marginTop: 10
  }
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { signinFacebook })(FacebookButton);
