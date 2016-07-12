import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ColorBackground from '../Backgrounds/ColorBackground';
import Header from '../Header';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { grey800 } from 'material-ui/styles/colors';
import { Palette } from '../../theme';
import { retrieveService } from '../../actions/service';

class ServicePage extends Component {

  componentDidMount() {
    this.props.retrieveService(this.props.params.id);
  }

  render() {
    if (this.props.index.isFetching) {
      return (
        <ColorBackground>
          <div className='loading'>
            <img src='http://www.endurancejunkies.com/theme/Ej/img/ajax-spinner-blue.gif' />
          </div>
        </ColorBackground>
      );
    }
    const service = this.props.service.info;
    const user = this.props.service.user;
    console.log(service);
    console.log(user);
    return (
      <ColorBackground>
        <div className='page'>
          <Header style={{
            height: '10%'
          }} title={service.name} backButton />
          <List>
            <ListItem style={styles.item}
              primaryText={
                <p><span style={styles.strong}><FormattedMessage id='service.name' /></span> <span style={styles.normal}>{service.name}</span></p>
              }
            />
            <Divider style={styles.divider} />
            <ListItem style={styles.item}
              primaryText={
                <p><span style={styles.strong}><FormattedMessage id='service.description' /></span><span style={styles.normal}>{service.description}</span></p>
              }
            />
            <Divider style={styles.divider} />
            <ListItem style={styles.item}
              primaryText={
                <p><span style={styles.strong}><FormattedMessage id='service.category' /></span> <span style={styles.normal}>{service.category}</span></p>
              }
            />
            <Divider style={styles.divider} />
            <ListItem style={styles.item}
              primaryText={
                <RaisedButton
                 linkButon={true}
                 label={service.phoneNumber}
                 href={'tel:' + service.phoneNumber}
                 icon={<FontIcon className='fa fa-phone' />}
                 style={styles.button}
                />
              }
            />
            <Divider style={styles.divider} />
            <ListItem style={styles.item}
              primaryText={
                <RaisedButton
                  linkButon={true}
                  label={user.privateEmail}
                  href={'mailto:' + user.privateEmail}
                  icon={<FontIcon className='fa fa-envelope' />}
                  style={styles.button}
                />
              }
            />
            <Divider style={styles.divider} />
          </List>
        </div>
      </ColorBackground>
    );
  }
}

const styles = {
  strong: {
    width: '25%',
    display: 'inline-block'
  },
  normal: {
    color: Palette.alternateTextColor
  },
  button: {
    width: '100%'
  },
  divider: {
    backgroundColor: grey800
  }
};

const mapStateToProps = state => {
  return {
    service: state.service,
    index: state.index
  };
};

export default connect(mapStateToProps, { retrieveService })(ServicePage);
