import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ColorBackground from '../Backgrounds/ColorBackground';
import Header from '../Header';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import { grey500, grey800 } from 'material-ui/styles/colors';
import { getAll, searchBuilding, nextToMe, selectBuilding } from '../../actions/building';

class BuildingListPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      isLoading: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNextToMe = this.handleNextToMe.bind(this);
  }

  componentDidMount() {
    this.props.getAll();
  }

  handleSearch(e) {
    if (e.which === 13 && e.nativeEvent.key === 'Enter') {
      this.props.searchBuilding(this.state.text);
      this.setState({
        text: ''
      });
    }
  }

  handleSelect(id) {
    this.props.selectBuilding(id);
    this.context.router.push('/');
  }

  handleNextToMe() {
    if (navigator.geolocation) {
      this.setState({ isLoading: true });
      navigator.geolocation.getCurrentPosition(function(position) {
        this.props.nextToMe(position.coords.latitude, position.coords.longitude);
        this.setState({ isLoading: false });
      }.bind(this));
    }
  }

  renderSearching() {
    return (
      <div style={styles.actionBar}>
        <TextField
          hintText={<FormattedMessage id='building.search' />}
          style={styles.searchField}
          onKeyPress={this.handleSearch}
          onChange={e => this.setState({ text: e.target.value })}
          value={this.state.text}
        />
        <RaisedButton
          label={<FormattedMessage id='building.nextButton' />}
          style={styles.searchButton}
          onTouchTap={this.handleNextToMe}
        />
      </div>
    );
  }

  renderList(list) {
    const components = list.map(item =>
      <div key={item.id}>
        <ListItem
          primaryText={<p style={styles.primaryText}>{item.name}</p>}
          secondaryText={<p style={styles.secondaryText}>{item.address}</p>}
          onTouchTap={this.handleSelect.bind(this, item.id)}
        />
        <Divider style={{backgroundColor: grey800}}/>
      </div>
    );
    return components;
  }

  renderFetching() {
    return (
      <div className='loading'>
        <CircularProgress size={1.5} />
      </div>
    );
  }

  render() {
    const searchBar = this.renderSearching();
    const list = this.renderList(this.props.building.list);
    const mainView = this.state.isLoading ? this.renderFetching() :
    (
      <List style={styles.listBuilding}>
        {list}
      </List>
    );
    return (
      <ColorBackground>
        <Header
          style={{
            height: '10%'
          }}
          title={<FormattedMessage id='building.title' />}
          menu
          backButton
        />
        {searchBar}
        {mainView}
      </ColorBackground>
    );
  }
}

BuildingListPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const styles = {
  actionBar: {
  },
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
  }
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, {getAll, searchBuilding, nextToMe, selectBuilding})(BuildingListPage);
