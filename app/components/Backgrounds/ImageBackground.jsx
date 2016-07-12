import React, {Component} from 'react';

/*
 *  This component renders a fullscreen image background. It needs to be wrapped around your page content
 *    (before any margins are applied, so preferably as root element).
 *    e.g.: <ImageBackground>Your page</ImageBackground>
 *
 *  Props:
 *    * (required) image: image (the result of require('image-url'))
 *    * (optional) blur: string in px, default='5px'
 *    * (optional) transparency: percentage in decimal notation, default=0.6
 */
export default class ImageBackground extends Component {

  render() {
    const styles = {
      bg: {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
        backgroundImage: `url("${this.props.image}")`,
        filter: `blur(${this.props.blur})`,
        WebkitFilter: `blur(${this.props.blur})`,
        transform: 'scale(1.03)',
        position: 'absolute',
        zIndex: '-1'
      },
      overlay: {
        height: '100%',
        width: '100%',
        background: `rgba(0,0,0,${this.props.transparency})`
      }
    };

    return (
      <div style={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden'
      }}>
        <div className='background-image' style={styles.bg}>
          <div style={styles.overlay}></div>
        </div>
        {this.props.children}
      </div>
    );
  }

}

ImageBackground.propTypes = {
  image: React.PropTypes.string.isRequired,
  blur: React.PropTypes.string,
  transparency: React.PropTypes.number
};
ImageBackground.defaultProps = {
  image: require("../../../images/Facade_blurred_mobile.jpg"),
  blur: '5px',
  transparency: 0.6
};
