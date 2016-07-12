import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWaiting: false,
      pin: null
    };
    this.handlePin = this.handlePin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePin(e) {
    this.setState({
      pin: e.target.value
    });
  }

  handleSubmit() {
    this.props.handleSubmit(this.props.requestId, this.state.pin);
    this.setState({
      isWaiting: true
    })
  }

  render() {
    return ( this.state.isWaiting ? (
        <CircularProgress />
      ) : (
        <div style={styles.wrapper}>
          <TextField
            floatingLabelText={<FormattedMessage id='verifynumber.code.pin' />}
            hintText='ex: 1234'
            fullWidth
            onChange={this.handlePin}
          />
          <RaisedButton
            label={<FormattedMessage id='verifynumber.code.buttonText' />}
            secondary
            fullWidth
            onTouchTap={this.handleSubmit}
            style={{marginTop: 20}}
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
  }
};

export default Code;
