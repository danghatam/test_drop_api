import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import { grey800, blueGrey200 } from 'material-ui/styles/colors';
import { Palette } from '../../theme';
import Validation from '../../helpers/validation';

class PersonalSetting extends Component {
  constructor(props) {
    super(props);

    //page state
    const user = this.props.auth.user;
    const phoneNumber = this.props.auth.phoneNumber;
    this.state = {
      name: {
        value: user.firstName,
        valid: true,
        error: null
      },
      email: {
        value: user.email,
        valid: true,
        error: null
      },
      workEmail: {
        value: user.workEmail,
        valid: true,
        error: null
      },
      phone: {
        value: !!phoneNumber.number && phoneNumber.isVerified ? phoneNumber.number : user.phone,
        valid: true,
        error: null
      }
    };

    //bind this to function
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleWorkEmail = this.handleWorkEmail.bind(this);
    // this.handlePhone = this.handlePhone.bind(this);
    this.handleSave = this.handleSave.bind(this);
    // this.handleValidate = this.handleValidate.bind(this);
  }

  handleValidate() {
    return (this.state.name.valid && this.state.email.valid && this.state.workEmail.valid && this.state.phone.valid);
  }

  handleName(e) {
    const validateName = Validation.name(e.target.value);
    this.setState({
      name: {
        value: e.target.value,
        valid: validateName.valid,
        error: validateName.error
      }
    });
  }

  handleEmail(e) {
    const validateEmail = Validation.email(e.target.value);
    this.setState({
      email: {
        value: e.target.value,
        valid: validateEmail.valid,
        error: validateEmail.error
      }
    });
  }

  handleWorkEmail(e) {
    const validateEmail = Validation.email(e.target.value);
    this.setState({
      workEmail: {
        value: e.target.value,
        valid: validateEmail.valid,
        error: validateEmail.error
      }
    });
  }

  // handlePhone(e) {
  //   const validatePhone = Validation.phone(e.target.value);
  //   this.setState({
  //     phone: {
  //       value: e.target.value,
  //       valid: validatePhone.valid,
  //       error: validatePhone.error
  //     }
  //   });
  // }

  handleSave(e) {
    if (this.handleValidate()) {
      const params = {
        firstName: this.state.name.value,
        privateEmail: this.state.email.value,
        workEmail: this.state.workEmail.value,
        phoneNumber: this.state.phone.value
      };
      this.props.onUpdateUser(params);
    }
  }

  render() {
    //user info
    return (
      <List>
        <ListItem style={styles.item}
          primaryText={
            <div>
              <span style={styles.strong}><FormattedMessage id='setting.personal.name' /></span>
              <TextField
                hintText='john'
                style={styles.field}
                inputStyle={styles.input}
                errorText={this.state.name.error}
                value={this.state.name.value}
                onChange={this.handleName}
              />
            </div>
          }
        />
        <Divider style={styles.divider} />
        <ListItem style={styles.item}
          primaryText={
            <div>
              <span style={styles.strong}><FormattedMessage id='setting.personal.email' /></span>
              <TextField
                hintText='email@example.com'
                style={styles.field}
                inputStyle={styles.input}
                errorText={this.state.email.error}
                value={this.state.email.value}
                onChange={this.handleEmail}
              />
            </div>
          }
        />
        <Divider style={styles.divider} />
        <ListItem style={styles.item}
          primaryText={
            <div>
              <span style={styles.strong}><FormattedMessage id='setting.personal.workEmail' /></span>
              <TextField
                hintText='email@example.com'
                style={styles.field}
                inputStyle={styles.input}
                errorText={this.state.workEmail.error}
                value={this.state.workEmail.value}
                onChange={this.handleWorkEmail}
              />
            </div>
          }
        />
        <Divider style={styles.divider} />
        <ListItem style={styles.item}
          primaryText={
            <div>
              <span style={styles.strong}><FormattedMessage id='setting.personal.phone' /></span>
              <TextField
                disabled={true}
                id='phone-disabled'
                style={styles.phoneText}
                inputStyle={styles.input}
                errorText={this.state.phone.error}
                value={this.state.phone.value}
              />
              <RaisedButton
                label={<FormattedMessage id='setting.personal.buttonEditText' />}
                backgroundColor={blueGrey200}
                style={styles.phoneButton}
                onTouchTap={() => this.props.router.push('/verify-phone-number')}
              />
            </div>
          }
        />
        <Divider style={styles.divider} />
        <RaisedButton
          label={<FormattedMessage id='setting.personal.buttonText' />}
          style={styles.button}
          onTouchTap={this.handleSave}
        />
      </List>
    );
  }
}

const styles = {
  strong: {
    width: '25%',
    display: 'inline-block'
  },
  field: {
    width: '72%'
  },
  input: {
    color: Palette.alternateTextColor
  },
  button: {
    width: '100%',
    marginTop: 10
  },
  phoneText: {
    width: '48%',
    marginRight: '2%'
  },
  phoneButton: {
    width: '22%'
  },
  divider: {
    backgroundColor: grey800
  }
};

export default PersonalSetting;
