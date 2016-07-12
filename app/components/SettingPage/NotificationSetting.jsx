import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { grey800 } from 'material-ui/styles/colors';
import { Palette } from '../../theme';

class NotificationSetting extends Component {

  render() {
    return (
      <List>
        <ListItem style={styles.item}
          primaryText={
            <p>Notification - Coming soon</p>
          }
        />
      </List>
    );
  }
}

const styles = {
  strong: {
    width: '25%',
    display: 'inline-block'
  },
  normal: {
    color: Palette.alternateTextColor,
    width: '72%'
  },
  button: {
    width: '100%',
    marginTop: 10
  },
  divider: {
    backgroundColor: grey800
  }
};

export default NotificationSetting;
