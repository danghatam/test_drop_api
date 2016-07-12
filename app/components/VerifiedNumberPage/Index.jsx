import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ColorBackground from '../Backgrounds/ColorBackground';
import Header from '../Header';
import Code from './Code';
import Number from './Number';
import Title from '../Title';
import { verifyPhoneNumber, checkVerifiedNumber } from '../../actions/user';

class VerifiedNumberPage extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.phoneNumber.isVerified) {
      this.context.router.push('/settings');
    }
  }

  render() {
    const view =
    !this.props.auth.phoneNumber.isWaitingConfirm ? (
      <Number handleSubmit={this.props.verifyPhoneNumber} />
    ) : (
      <Code
        isVerified={this.props.auth.phoneNumber.isWaitingConfirm}
        requestId={this.props.auth.phoneNumber.requestId}
        handleSubmit={this.props.checkVerifiedNumber}
      />
    );

    return (
      <ColorBackground>
        <Header
          style={styles.header}
          backButton
          menu
        />
        <Title
          title={<FormattedMessage id='verifynumber.title' />}
          subtitle=''
          style={styles.title} />
        <div style={styles.container}>
          {view}
        </div>
      </ColorBackground>
    );
  }
}

VerifiedNumberPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const styles = {
  container: {
    width: '100%',
    height: '70%',
    display: 'flex',
    justifyContent: 'center'
  },
  header: {
    height: '10%'
  },
  title: {
    height: '20%'
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {verifyPhoneNumber, checkVerifiedNumber})(VerifiedNumberPage);
