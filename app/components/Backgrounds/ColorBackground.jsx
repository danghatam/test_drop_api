import React, {Component, PropTypes} from 'react';

export default class ColorBackground extends Component {

  render() {
    return (
      <div style={{
        height: '100%',
        backgroundColor: this.props.color
      }}>
        {this.props.children}
      </div>
    );
  }
}

ColorBackground.propTypes = {
  color: PropTypes.string
};
ColorBackground.defaultProps = {
  color: "#17282D"
};
