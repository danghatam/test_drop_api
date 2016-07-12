import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Palette } from '../theme';
import ColorBackground from './Backgrounds/ColorBackground';
import {
  confirmChangePassword,
  verify,
  terminateToken
} from '../actions/user';

class CallbackPage extends Component {

  componentDidMount() {
    this.handleSendRequest(this.props.location.query.type);
  }

  handleSendRequest(type) {
    switch (type) {
      case 'register':
        this.props.verify(this.props.location.query.token, type);
        break;
      case 'update_private_email':
        this.props.verify(this.props.location.query.token, type);
        break;
      case 'update_work_email':
        this.props.verify(this.props.location.query.token, type);
        break;
      case 'reset_password':
        this.props.confirmChangePassword(this.props.location.query.token);
        break;
      case 'terminate_token':
        this.props.terminateToken(this.props.location.query.code);
        break;
    }
  }

  render() {
    const view = !this.props.auth.isConfirmed ? (
      <CircularProgress />
    ) : (
      <RaisedButton
        label={<FormattedMessage id='callback.continue' />}
        onTouchTap={() => this.context.router.push('/')}
      />
    );
    return (
      <ColorBackground>
        <div style={styles.loading}>
          {view}
        </div>
        <Snackbar
          open={this.props.auth.isConfirmed}
          message={<FormattedMessage id='callback.message' />}
          bodyStyle={{ color: Palette.alternateTextColor }}
          autoHideDuration={4000}
        />
      </ColorBackground>
    );
  }
}

const styles = {
  loading: {
    height: '100%',
    width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
};

CallbackPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  confirmChangePassword,
  verify,
  terminateToken
})(CallbackPage);
