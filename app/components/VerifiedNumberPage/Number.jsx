import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Validation from '../../helpers/validation';

class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWaiting: false,
      phone: {
        value: null,
        valid: false,
        error: null
      }
    };
    this.validatePhone = this.validatePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validatePhone(e) {
    const validatePhone = Validation.phone(e.target.value);
    this.setState({
      phone: {
        value: e.target.value,
        valid: validatePhone.valid,
        error: validatePhone.error
      }
    });
  }

  handleSubmit() {
    if (this.state.phone.valid) {
      this.props.handleSubmit(this.state.phone.value);
      this.setState({
        isWaiting: true
      });
    }
  }

  render() {
    return ( this.state.isWaiting ? (
        <CircularProgress />
      ) : (
        <div style={styles.wrapper}>
          <TextField
            hintText='ex: 440201234567'
            fullWidth
            errorText={this.state.phone.error}
            onChange={this.validatePhone}
            style={styles.text}
          />
          <RaisedButton
            label={<FormattedMessage id='verifynumber.number.buttonText' />}
            secondary
            fullWidth
            onTouchTap={this.handleSubmit}
            style={styles.button}
          />
        </div>
      )
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginTop: 20
  }
};

export default Number;
