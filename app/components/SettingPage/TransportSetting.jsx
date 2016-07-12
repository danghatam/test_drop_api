import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import { grey500, grey600, grey700, grey800 } from 'material-ui/styles/colors';
import { Palette } from '../../theme';

class TransportSetting extends Component {
  constructor(props) {
    super(props);
    const user = this.props.auth.user;
    this.state = {
      transportMethods: [
        { value: 'Car', isSelected: false },
        { value: 'Bus', isSelected: false },
        { value: 'Train', isSelected: false },
        { value: 'Subway', isSelected: false },
        { value: 'RER', isSelected: false },
        { value: 'Tramway', isSelected: false },
        { value: 'Velib', isSelected: false }
      ],
      favouriteAddresses: user.favouriteAddresses || [],
      tagInput: '',
      addressInput: '',
      showNotice: false
    };
  }

  componentDidMount() {
    const user = this.props.auth.user;
    this.state.transportMethods.forEach((ele, index) => {
      if (user.transportMethods.indexOf(ele.value) > -1) {
        ele.isSelected = true;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.isUpdated) {
      this.setState({
        showNotice: true
      });
    }
  }

  handleSelectMethod(index, currentValue) {
    this.state.transportMethods[index].isSelected = !currentValue;
    const newState = this.state.transportMethods.slice(0);
    this.setState({
      transportMethods: newState
    });
  }

  handleRemoveFavouriteAddress(index) {
    this.state.favouriteAddresses.splice(index, 1);
    const newState = this.state.favouriteAddresses.slice(0);
    this.setState({
      favouriteAddresses: newState
    });
  }

  handleAddFavouriteAddress() {
    if (!!this.state.tagInput && !!this.state.addressInput) {
      const newState = [...this.state.favouriteAddresses, { tag: this.state.tagInput, value: this.state.addressInput }];
      this.setState({
        favouriteAddresses: newState,
        tagInput: '',
        addressInput: ''
      });
    }
  }

  handleSave() {
    const params = {
      transportMethods: this.state.transportMethods.filter(item => item.isSelected).map(item => item.value),
      favouriteAddresses: this.state.favouriteAddresses
    };
    this.props.onUpdateUser(params);
  }

  renderTransportMethods() {
    return this.state.transportMethods.map((item, index) => {
      return (
        item.isSelected
        ? (
          <Chip key={index} style={styles.chip} backgroundColor={grey500} onTouchTap={this.handleSelectMethod.bind(this, index, item.isSelected)}>
            <Avatar icon={<FontIcon className='fa fa-check' />} backgroundColor={grey600} color={grey700} />
            {item.value}
          </Chip>
        ) : (
          <Chip key={index} style={styles.chip} onTouchTap={this.handleSelectMethod.bind(this, index, item.isSelected)}>
            {item.value}
          </Chip>
        )
      );
    });
  }

  renderFavouriteAddresses() {
    return this.state.favouriteAddresses.map((item, index) =>
      <ListItem key={index} style={styles.item}
        primaryText={
          <div>
            <span style={styles.leftCol}>{item.tag}</span>
            <span style={styles.rightCol}>{item.value}</span>
            <IconButton style={styles.buttonCol} iconClassName='fa fa-times-circle' onTouchTap={this.handleRemoveFavouriteAddress.bind(this, index)} />
          </div>
        }
      />
    );
  }

  render() {
    return (
      <List style={styles.container}>
        <ListItem style={styles.item}
          primaryText={
            <div>
              <span style={styles.strong}><FormattedMessage id='setting.transport.methods' /></span>
              <div style={styles.wrapper}>
                {this.renderTransportMethods()}
              </div>
            </div>
          }
        />
        <Divider style={styles.divider} />
        <ListItem style={styles.item}
          primaryText={
            <div>
              <span style={{width: '100%', display: 'block'}}><FormattedMessage id='setting.transport.favouriteAddresses' /></span>
              <TextField
                name='tag-input'
                floatingLabelText={<FormattedMessage id='setting.transport.favourite.tagHint' />}
                style={Object.assign({}, styles.leftCol, styles.input)}
                value={this.state.tagInput}
                onChange={(e) => this.setState({tagInput: e.target.value})} />
              <TextField
                name='address-input'
                floatingLabelText={<FormattedMessage id='setting.transport.favourite.addressHint' />}
                style={Object.assign({}, styles.rightCol, styles.input)}
                value={this.state.addressInput}
                onChange={(e) => this.setState({addressInput: e.target.value})} />
              <IconButton
                iconStyle={styles.buttonAdd}
                style={styles.buttonCol}
                iconClassName='fa fa-plus'
                onTouchTap={this.handleAddFavouriteAddress.bind(this)} />
            </div>
          }
        />
        {this.renderFavouriteAddresses()}
        <Divider style={styles.divider} />
        <RaisedButton
          label={<FormattedMessage id='setting.transport.button.save' />}
          style={styles.button}
          onTouchTap={this.handleSave.bind(this)}
        />
        <Snackbar
          open={this.state.showNotice}
          message={<FormattedMessage id='setting.notice.success' />}
          bodyStyle={{ color: Palette.alternateTextColor }}
          autoHideDuration={600}
        />
      </List>
    );
  }
}

const styles = {
  container: {
    minHeight: 550
  },
  strong: {
    width: '25%',
    display: 'inline-block'
  },
  field: {
    width: '72%'
  },
  leftCol: {
    width: '35%',
    display: 'inline-block'
  },
  rightCol: {
    width: '55%',
    display: 'inline-block',
    marginLeft: '2%'
  },
  buttonCol: {
    width: '5%',
    display: 'inline-block'
  },
  buttonAdd: {
    backgroundColor: Palette.alternateTextColor,
    padding: 3
  },
  input: {
    color: Palette.alternateTextColor
  },
  button: {
    width: '100%',
    marginTop: 10
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  divider: {
    backgroundColor: grey800
  }
};

export default TransportSetting;
