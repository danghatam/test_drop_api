import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ColorBackground from '../Backgrounds/ColorBackground';
import Header from '../Header';
import PersonalSetting from './PersonalSetting';
import TransportSetting from './TransportSetting';
import NotificationSetting from './NotificationSetting';
import { update as updateUser } from '../../actions/user';

class SettingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value
    });
  };

  handleUpdateUser(params) {
    this.props.updateUser(params);
  }

  render() {
    return (
      <ColorBackground>
        <Header
          style={{
            height: '10%'
          }}
          menu
          backButton
        />
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          tabItemContainerStyle={{ backgroundColor: 'none' }}
        >
          <Tab label={<FormattedMessage id='setting.personal' />} value={0} />
          <Tab label={<FormattedMessage id='setting.transport' />} value={1} />
          <Tab label={<FormattedMessage id='setting.notification' />} value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={styles.slide}>
            <PersonalSetting
              auth={this.props.auth}
              onUpdateUser={this.handleUpdateUser}
              router={this.context.router}
            />
          </div>
          <div style={styles.slide}>
            <TransportSetting
              auth={this.props.auth}
              onUpdateUser={this.handleUpdateUser}
            />
          </div>
          <div style={styles.slide}>
            <NotificationSetting />
          </div>
        </SwipeableViews>
      </ColorBackground>
    );
  }
}

SettingPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {updateUser})(SettingPage);
