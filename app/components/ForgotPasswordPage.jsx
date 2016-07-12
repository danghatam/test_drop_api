import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { forgetPassword } from '../actions/user';
import { reset } from '../actions';
import ColorBackground from './Backgrounds/ColorBackground';
import Header from './Header';
import validation from '../helpers/validation';
import ErrorMessage from './Features/ErrorMessage';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ChangePasswordPage extends Component {

  constructor() {
    super();
    this.state = {
      email: {
        text: null,
        valid: null,
        error: null
      },
			error: null,
			showMessage: false
    };
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.validEmail = this.validEmail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.waitingConfirm) {
      this.context.router.push(`/login`);
    }
    if (nextProps.index.error) {
			this.setState({
				error: nextProps.index.error,
				showMessage: true
			});
			this.props.reset();
		}
  }

  validEmail(e) {
    const valid = validation.email(e.target.value);
    this.setState({
      email: {
        text: e.target.value,
        valid: valid.valid,
        error: valid.error
      }
    });
  }

  validateOnSubmit() {
    const email = this.state.email;
    const valid = validation.isRequired(email.text);
    this.setState({
      email: {
        text: email.text,
        valid: valid.valid && email.valid,
        error: valid.error ? valid.error : email.error
      }
    });
  }

  handleForgotPassword() {
    this.validateOnSubmit();
    const email = this.state.email;
    if (email.valid) {
      const params = {
        email: email.text
      };
      this.props.forgetPassword(params);
    }
  }

  render() {
    return (
      <ColorBackground>
        <Header
          style={{
            height: '10%'
          }}
          title={<FormattedMessage id='forgotpassword.title' />}
          menu
          backButton
        />
        <div
					className='page'
					style={styles.container}>

					<TextField
						floatingLabelText={<FormattedMessage id='forgotpassword.email' />}
						hintText='john@appleseed.com'
						fullWidth
						errorText={this.state.email.error}
						onChange={ this.validEmail }
						/>

					<RaisedButton
						label={<FormattedMessage id='forgotpassword.buttonText' />}
						secondary
						fullWidth
						onTouchTap={this.handleForgotPassword}
						style={{marginTop: 20}}
						/>

					<ErrorMessage
						error={this.state.error}
						open={this.state.showMessage}
						handleClose={() => { this.setState({ showMessage: false }); }}
					/>
				</div>
      </ColorBackground>
    );
  }
}

ChangePasswordPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
};

const mapStateToProps = state => {
  return {
    index: state.index,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { forgetPassword, reset })(ChangePasswordPage);
