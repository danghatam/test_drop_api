import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { changePassword } from '../actions/user';
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
      currentPassword: {
        text: null,
        valid: null,
        error: null
      },
      newPassword: {
        text: null,
        valid: null,
        error: null
      },
      repeatNewPassword: {
        text: null,
        valid: null,
        error: null
      },
			error: null,
			showMessage: false
    };
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.validCurrentPassword = this.validCurrentPassword.bind(this);
    this.validNewPassword = this.validNewPassword.bind(this);
    this.validRepeatNewPassword = this.validRepeatNewPassword.bind(this);
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
		}
  }

  validCurrentPassword(e) {
    const valid = validation.isRequired(e.target.value);
    this.setState({
      currentPassword: {
        text: e.target.value,
        valid: valid.valid,
        error: valid.error
      }
    });
  }

  validNewPassword(e) {
    const valid = validation.isRequired(e.target.value);
    this.setState({
      newPassword: {
        text: e.target.value,
        valid: valid.valid,
        error: valid.error
      }
    });
  }

  validRepeatNewPassword(e) {
    const valid = validation.comparePassword(this.state.newPassword.text, e.target.value);
    this.setState({
      repeatNewPassword: {
        text: e.target.value,
        valid: valid.valid,
        error: valid.error
      }
    });
  }

  validateOnSubmit() {
    const password = this.state.currentPassword;
    const newPassword = this.state.newPassword;
    const repeatPassword = this.state.repeatNewPassword;
    const validPassword = validation.isRequired(password.text);
    const validNewPassword = validation.isRequired(newPassword.text);
    const validRepeatNewPassword = validation.isRequired(repeatPassword.text);
    this.setState({
      currentPassword: {
        text: password.text,
        valid: validPassword.valid,
        error: validPassword.error
      },
      newPassword: {
        text: newPassword.text,
        valid: validNewPassword.valid,
        error: validNewPassword.error
      },
      repeatNewPassword: {
        text: repeatPassword.text,
        valid: validRepeatNewPassword.valid,
        error: validRepeatNewPassword.error
      }
    });
  }

  handleChangePassword() {
    this.validateOnSubmit();
    const password = this.state.currentPassword;
    const newPassword = this.state.newPassword;
    const repeatPassword = this.state.repeatNewPassword;
    const validCompare = validation.comparePassword(newPassword.text, repeatPassword.text);
    if (password.valid && newPassword.valid && validCompare.valid) {
      const params = {
        password: password.text,
        newPassword: newPassword.text
      };
      this.props.changePassword(params);
    }
  }

  render() {
    return (
      <ColorBackground>
        <Header
          style={{
            height: '10%'
          }}
          title={<FormattedMessage id='changepassword.title' />}
          menu
          backButton
        />
        <div
					className='page'
					style={styles.container}>

					<TextField
						floatingLabelText={<FormattedMessage id='changepassword.current' />}
            type='password'
						fullWidth
						errorText={this.state.currentPassword.error}
						onChange={ this.validCurrentPassword }
						/>

					<TextField
						floatingLabelText={<FormattedMessage id='changepassword.new' />}
						type='password'
						fullWidth
						errorText={this.state.newPassword.error}
						onChange={ this.validNewPassword }
						/>

					<TextField
						floatingLabelText={<FormattedMessage id='changepassword.newAgain' />}
						type='password'
						fullWidth
						errorText={this.state.repeatNewPassword.error}
						onChange={ this.validRepeatNewPassword }
						/>

					<RaisedButton
						label={<FormattedMessage id='changepassword.buttonText' />}
						secondary
						fullWidth
						onTouchTap={this.handleChangePassword}
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

export default connect(mapStateToProps, { changePassword, reset })(ChangePasswordPage);
