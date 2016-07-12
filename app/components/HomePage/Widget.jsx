import React from 'react';

import FontIcon from 'material-ui/FontIcon';

export default class Widget extends React.Component {

  render() {
    const styles = {
      widget: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        alignItems: 'center',
        textAlign: this.props.right ? 'left' : 'right'
      },
      data: {
        width: '70%'
      },
      title: {

      },
      accent: {
        fontSize: '150%',
        lineHeight: '130%'
      },
      iconContainer: {
        width: '25%',
        textAlign: 'center'
      },
      icon: {
        fontSize: '200%'
      }
    };

    return (
      <div style={styles.widget}>
        {this.props.right && (
          <div style={styles.iconContainer}>
            <FontIcon className={"fa " + this.props.icon} style={styles.icon}></FontIcon>
          </div>
        )}
        <div style={styles.data}>
          <span style={styles.title}>{this.props.title}</span> <br/>
          <span style={styles.accent}>{this.props.value}</span>
        </div>
        {!this.props.right && (
          <div style={styles.iconContainer}>
            <FontIcon className={"fa " + this.props.icon} style={styles.icon}></FontIcon>
          </div>
        )}
      </div>
    );
  }
}

Widget.propTypes = {
  right: React.PropTypes.bool,
  title: React.PropTypes.object.isRequired,
  value: React.PropTypes.string,
  icon: React.PropTypes.string.isRequired
};
Widget.defaultProps = {
  right: false
};
