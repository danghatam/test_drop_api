import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { retrievePassword } from '../actions/user';
import { reset } from '../actions';
import ColorBackground from './Backgrounds/ColorBackground';
import Header from './Header';
import validation from '../helpers/validation';
import ErrorMessage from './Features/ErrorMessage';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class RetrievePasswordPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
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
    this.handleRetrievePassword = this.handleRetrievePassword.bind(this);
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
			this.props.reset();
		}
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
    const newPassword = this.state.newPassword;
    const repeatPassword = this.state.repeatNewPassword;
    const validNewPassword = validation.isRequired(newPassword.text);
    const validRepeatNewPassword = validation.isRequired(repeatPassword.text);
    this.setState({
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

  handleRetrievePassword() {
    this.validateOnSubmit();
    const newPassword = this.state.newPassword;
    const repeatPassword = this.state.repeatNewPassword;
    if (newPassword.valid && repeatPassword.valid) {
      const token = this.props.location.query.token;
      const params = {
        password: newPassword.text
      };
      this.props.retrievePassword(token, params);
    }
  }

  render() {
    return (
      <ColorBackground>
        <Header
          style={{
            height: '10%'
          }}
          title={<FormattedMessage id='retrievepassword.title' />}
          menu
          backButton
        />
        <div
					className='page'
					style={styles.container}>

					<TextField
						floatingLabelText={<FormattedMessage id='retrievepassword.new' />}
						type='password'
						fullWidth
						errorText={this.state.newPassword.error}
						onChange={ this.validNewPassword }
						/>

					<TextField
						floatingLabelText={<FormattedMessage id='retrievepassword.newAgain' />}
						type='password'
						fullWidth
						errorText={this.state.repeatNewPassword.error}
						onChange={ this.validRepeatNewPassword }
						/>

					<RaisedButton
						label={<FormattedMessage id='retrievepassword.buttonText' />}
						secondary
						fullWidth
						onTouchTap={this.handleRetrievePassword}
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

RetrievePasswordPage.contextTypes = {
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

export default connect(mapStateToProps, { retrievePassword, reset })(RetrievePasswordPage);
