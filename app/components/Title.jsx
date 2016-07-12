import React, { PropTypes, Component} from 'react';
import FontIcon from 'material-ui/FontIcon';

export default class Title extends Component {

  render () {
    const {title, subtitle, style, icon} = this.props;

    const styles = {
      container: {
        height: (style && style.height) ? style.height : '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      title: {
        lineHeight: '150%',
        fontSize: '185%'
      }
    };

    return (
      <div style={styles.container}>
        {icon && (<FontIcon className={"fa " + icon + " bigIcon"} />)}
				<h1 style={styles.title}>{title}</h1>
				{subtitle && (<p>{subtitle}</p>)}
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.object.isRequired,
  subtitle: PropTypes.object,
  style: PropTypes.object,
  icon: PropTypes.string
};
Title.defaultProps = {
  subtitle: undefined,
  style: {},
  icon: undefined
};
