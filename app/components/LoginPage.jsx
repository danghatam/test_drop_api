import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Title from './Title';
import {signin} from '../actions/user';
import {reset} from '../actions';
import validation from '../helpers/validation';
import ErrorMessage from './Features/ErrorMessage';
import FacebookButton from './Features/FacebookButton';
import LinkedinButton from './Features/LinkedinButton';
import ColorBackground from './Backgrounds/ColorBackground';
import Footer from './Features/Footer';

class LoginPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			email: {
				text: null,
				valid: false,
				error: null
			},
			password: {
				text: null,
				valid: false,
				error: null
			},
			error: null,
			showMessage: false,
			isLoading: false
		};
		this.handleSignIn = this.handleSignIn.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.handleWaiting = this.handleWaiting.bind(this);
	}

	componentWillMount() {
		if (this.props.auth.isAuthenticated) {
			this.context.router.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		//redirect
		if (!!localStorage.authToken) {
			if (!localStorage.buildingId) {
				this.context.router.push('/select-building');
			} else {
				this.context.router.push('/');
			}
		}
		// show error if exists
		if (nextProps.index.error) {
			this.setState({
				error: nextProps.index.error,
				showMessage: true,
				isWaiting: false
			});
			this.props.reset();
		}
	}

  validatePassword(e) {
    const validPass = validation.isRequired(e.target.value);
    this.setState({
      password: {
        text: e.target.value,
        valid: validPass.valid,
        error: validPass.error
      }
    });
  }

  validateEmail(e) {
    const validEmail = validation.email(e.target.value);
    this.setState({
      email: {
        text: e.target.value,
        valid: validEmail.valid,
        error: validEmail.error
      }
    });
  }

  validateRequiedField() {
    const email = this.state.email;
    const password = this.state.password;

    //isRequired validate
    const validEmail = validation.isRequired(email.text);
    const validPassword = validation.isRequired(password.text);

    this.setState({
     email: {
       text: email.text,
       valid: validEmail.valid && email.valid,
       error: validEmail.error ? validEmail.error : email.error
     },
     password: {
       text: password.text,
       valid: validPassword.valid,
       error: validPassword.error
     }
   });
  }

  validate() {
		//isRequiredField
		this.validateRequiedField();
		//validate
    return this.state.email.valid && this.state.password.valid;
  }

	handleSignIn(type, e) {
		if (this.validate()) {
			const email = this.state.email.text.trim();
			const password = this.state.password.text.trim();
			const params = {
				email: email,
				password: password
			};
			this.props.signin(params);
			this.handleWaiting();
		}
	}

	handleWaiting() {
		this.setState({
			isWaiting: true
		});
	}

	renderLoading() {
		return this.state.isWaiting ? (
				<div style={styles.loading}>
					<CircularProgress />
				</div>
			) : null;
	}

  render() {
		const registerLink = () => (
			<span><FormattedMessage id='login.signup' /><Link to='/register'><FormattedMessage id='login.signupLink' /></Link></span>
		);
		const forgotPasswordLink = (
			<span><Link to='/forgot-password'><FormattedMessage id='login.forgotLink' /></Link></span>
		);
    return (
      <ColorBackground >
				<div
					className='page'
					style={styles.container}>

					<Title
						title={<FormattedMessage id='login.title' />}
						subtitle={registerLink()}
						style={{ height: '30%' }} />
					<TextField
						floatingLabelText={<FormattedMessage id='login.email' />}
						hintText='john@appleseed.com'
						fullWidth
						errorText={this.state.email.error}
						onChange={this.validateEmail}
						/>

					<TextField
						floatingLabelText={<FormattedMessage id='login.password' />}
						hintText='Your password'
						type='password'
						fullWidth
						errorText={this.state.password.error}
						onChange={this.validatePassword}
						/>

					<RaisedButton
						label={<FormattedMessage id='login.submit' />}
						secondary
						fullWidth
						onTouchTap={this.handleSignIn}
						style={{marginTop: 20}}
						/>

					<FacebookButton onWaiting={this.handleWaiting} />

					<LinkedinButton
						code={this.props.location.query.code}
						onWaiting={this.handleWaiting}
					/>

					<div style={styles.forgotLink}>{ forgotPasswordLink }</div>

					{this.renderLoading()}

					<Footer />

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

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'space-between'
	},
	forgotLink: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '10px 0'
	},
	loading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
};

LoginPage.contextTypes = {
	router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, {signin, reset})(LoginPage);
