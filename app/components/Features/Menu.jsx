import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class Menu extends Component {

  constructor() {
    super();
    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  render() {
    return (
      <div>
        <IconButton onTouchTap={ this.handleOpen }>
          <FontIcon className='fa fa-bars' aria-hidden='true'/>
        </IconButton>
        <Drawer
          width={200}
          open={this.state.open}
          docked={false}
          onRequestChange={(open) => this.setState({open}) }
          style={{}}
        >
          <Link to='/select-building'><MenuItem><FormattedMessage id='menu.selectBuilding' /></MenuItem></Link>
          <Link to='/about'><MenuItem><FormattedMessage id='menu.about' /></MenuItem></Link>
          <Link to='/help'><MenuItem><FormattedMessage id='menu.help' /></MenuItem></Link>
          <Link to='/change-password'><MenuItem><FormattedMessage id='menu.changePassword' /></MenuItem></Link>
          <Link to='/settings'><MenuItem><FormattedMessage id='menu.settings' /></MenuItem></Link>
        </Drawer>
      </div>
    );
  }
}

export default Menu;
