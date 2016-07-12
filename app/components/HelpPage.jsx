import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorBackground from './Backgrounds/ColorBackground';
import Header from './Header';

class Help extends Component {
  render() {
    return (
      <ColorBackground>
        <Header
          style={{
            height: '10%'
          }}
          title='HELP'
          menu
          backButton
        />
      </ColorBackground>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Help);
