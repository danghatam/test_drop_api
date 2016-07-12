import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Palette } from '../../theme';

const styles = {
  button: {
    width: '50px',
    textAlign: 'center'
  },
  dialog: {
    color: Palette.alternateTextColor
  }
};

class ErrorMessage extends Component {

  messageFromCode(code) {
    switch (code) {
      case 400:
        return (
          <FormattedMessage id='error.badrequest' />
        );
      case 401:
        return (
          <FormattedMessage id='error.unauthorized' />
        );
      case 403:
        return <FormattedMessage id='error.forbidden' />;
      case 404:
        return <FormattedMessage id='error.notfound' />;
      case 409:
        return <FormattedMessage id='error.conflict' />;
      case 500:
        return (
          <FormattedMessage id='error.servererror' />
        );
      default: return null;
    }
  }

  render() {
    const error = this.messageFromCode(this.props.error);
    const actions = [
      <FlatButton
        label='Close'
        labelStyle={styles.dialog}
        primary={true}
        onTouchTap={this.props.handleClose}
        style={styles.button}
      />
    ];
    return (
      <Dialog
        title='Error'
        titleStyle={styles.dialog}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
      >
        {error}
      </Dialog>
    );
  }
}
ErrorMessage.PropTypes = {
  error: React.PropTypes.number.isRequired,
  open: React.PropTypes.bool.isRequired,
  handleClose: React.PropTypes.func
};

export default ErrorMessage;
