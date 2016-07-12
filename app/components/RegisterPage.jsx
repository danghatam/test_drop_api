import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Title from './Title';
import { signin, register } from '../actions/user';
import validation from '../helpers/validation';
import ErrorMessage from './Features/ErrorMessage';
import ColorBackground from './Backgrounds/ColorBackground';
import Header from './Header';
import Footer from './Features/Footer';

class RegisterPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: {
        text: null,
        valid: false,
        error: null
      },
      name: {
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
      isWaiting: false
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    //check register successfully
    if (nextProps.index.status) {
      const params = {
        email: this.state.email.text,
        password: this.state.password.text
      };
      this.props.signin(params);
    }

    //check login successfully
    if (nextProps.auth.isAuthenticated) {
			if (!localStorage.buildingId) {
				this.context.router.push('/select-building');
			} else {
				this.context.router.push('/');
			}
		}

    //have errors
    if (nextProps.index.error) {
      this.setState({
        error: nextProps.index.error,
        showMessage: true,
        isWaiting: false
      });
    }
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

  validatePassword(e) {
    const validPass = validation.passwordLength(e.target.value);
    this.setState({
      password: {
        text: e.target.value,
        valid: validPass.valid,
        error: validPass.error
      }
    });
  }

  validateName(e) {
    const validName = validation.name(e.target.value);
    this.setState({
      name: {
        text: e.target.value,
        valid: validName.valid,
        error: validName.error
      }
    });
  }

  validateRequiedField() {
    const email = this.state.email;
    const name = this.state.name;
    const password = this.state.password;

    //isRequired validate
    const validEmail = validation.isRequired(email.text);
    const validName = validation.isRequired(name.text);
    const validPassword = validation.isRequired(password.text);

    this.setState({
     email: {
       text: email.text,
       valid: validEmail.valid && email.valid,
       error: validEmail.error ? validEmail.error : email.error
     },
     name: {
       text: name.text,
       valid: validName.valid && name.valid,
       error: validName.error ? validName.error : name.error
     },
     password: {
       text: password.text,
       valid: validPassword.valid && password.valid,
       error: validPassword.error ? validPassword.error : password.error
     }
   });
  }

  validate() {
    //isRequired
    this.validateRequiedField();
    //validate
    return this.state.email.valid && this.state.name.valid && this.state.password.valid;
  }

  handleWaiting() {
    this.setState({
      isWaiting: !this.state.isWaiting
    });
  }

  handleRegister(e) {
    e.preventDefault();
    //register
    if (this.validate()) {
      const email = this.state.email.text.trim();
      const name = this.state.name.text.trim();
      const password = this.state.password.text.trim();
      const user = {
        privateEmail: email,
        firstName: name,
        password: password
      };
      this.props.register(user);
      this.handleWaiting();
    }
  }

  renderLoading() {
		return this.state.isWaiting ? (
				<div style={styles.loading}>
					<CircularProgress />
				</div>
      ) : null;
	}

  render() {
    return (
      <ColorBackground>
				<div
					className='page'
					style= {styles.container} >
          <Header
            style={{
              height: '10%'
            }}
            backButton
          />
					<Title
						title={<FormattedMessage id='register.title' />}
						style={{ height: "30%" }} />
					<TextField
						floatingLabelText={<FormattedMessage id='register.name' />}
						hintText='john'
						fullWidth
            ref={ref => { this.name = ref; }}
            errorText={this.state.name.error}
            onChange={this.validateName}
						/>
					<TextField
						floatingLabelText={<FormattedMessage id='register.email' />}
						hintText='john@appleseed.com'
						fullWidth
            ref={ref => { this.email = ref; }}
            errorText={this.state.email.error}
            onChange={this.validateEmail}
						/>
					<TextField
						floatingLabelText={<FormattedMessage id='register.password' />}
						type='password'
						fullWidth
            ref={ref => { this.password = ref; }}
            errorText={this.state.password.error}
            onChange={this.validatePassword}
						/>
					<RaisedButton
						label={<FormattedMessage id='register.submit' />}
						secondary
						fullWidth
						onTouchTap={this.handleRegister.bind(this)}
            style={styles.submit}
						/>

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
    flexDirection: 'column'
  },
  submit: {
    marginTop: 20
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

RegisterPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, {signin, register})(RegisterPage);
