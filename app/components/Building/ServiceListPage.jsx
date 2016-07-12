import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ColorBackground from '../Backgrounds/ColorBackground';
import Header from '../Header';
import { grey500, grey800 } from 'material-ui/styles/colors';

class ServiceListPage extends Component {

  renderList(keys, services) {
    const components = keys.map(key =>
      <div key={key}>
        <ListItem
          primaryText={<p style={styles.primaryText}>{services[key].name}</p>}
          secondaryText={<p style={styles.secondaryText}>{services[key].description}</p>}
          onTouchTap={ () => this.context.router.push(`/services/${key}`) }
        />
        <Divider style={styles.divider} />
      </div>
    );
    return components;
  }

  render() {
    const building = this.props.building;
    const services = this.renderList(building.current.services, building.services);
    return (
      <ColorBackground>
        <div style={styles.container}>
          <Header
            title={<FormattedMessage id='service.title' />}
            backButton
          />
          <List>
            {services}
          </List>
        </div>
      </ColorBackground>
    );
  }
}

ServiceListPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const styles = {
  listBuilding: {
    maxHeight: '100%',
    overflow: 'scroll'
  },
  searchField: {
    width: '66%',
    marginRight: '2%',
    marginLeft: '2%'
  },
  searchButton: {
    width: '28%'
  },
  primaryText: {
  },
  secondaryText: {
    color: grey500
  },
  divider: {
    backgroundColor: grey800
  }
};

const mapStateToProps = state => {
  return {
    building: state.building
  };
};

export default connect(mapStateToProps)(ServiceListPage);
