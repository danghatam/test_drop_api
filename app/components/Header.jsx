import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Menu from './Features/Menu';

class Header extends Component {

  render() {
    const {style} = this.props;

    const defaultStyle = {
      container: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      sideButton: {
        width: '48px'
      }
    };

    Object.assign(defaultStyle.container, style);

    return (
      <div style={defaultStyle.container}>
        <div style={defaultStyle.sideButton}>
          {this.props.backButton && (
            <IconButton onTouchTap={() => this.props.router.goBack()}>
              <FontIcon className='fa fa-chevron-left' aria-hidden='true'/>
            </IconButton>
          )}
        </div>
        <div>{this.props.title}</div>
        <div style={defaultStyle.sideButton}>
          {this.props.menu && (
            <Menu />
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  backbutton: PropTypes.bool,
  menu: PropTypes.bool,
  style: PropTypes.object
};
Header.defaultProps = {
  backButton: false,
  menu: false,
  style: {},
  title: undefined
};

Header.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default withRouter(Header);
