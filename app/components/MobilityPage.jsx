import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import L from 'leaflet';
import 'leaflet_css';
import 'leaflet_awesome_markers';
import 'leaflet_markers_css';

import Header from './Header';
import { ICONS } from '../constants/map';

class MobilityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carSelected: true,
      busSelected: true,
      metroSelected: true,
      bikeSelected: true,
      trainSelected: true
    };
  }

  componentDidMount() {
    this.init(this.props.building);
  }

  init(building) {
    const transports = building.current.nearbyStops;
    // TODO replace with data from redux
    //create position
    const latlng = [building.current.geolocation[1], building.current.geolocation[0]];
    const buildingMarker = L.marker(latlng, { icon: ICONS.building }).bindPopup(building.current.name);
    const metroMarkers = [];
    const bikeMarkers = [];
    const busMarkers = [];
    const carMarkers = [];
    const trainMarkers = [];
    transports.forEach(item => {
      switch (item.stopType) {
        case 'physical_mode:Bus':
          const busMarker = L.marker(item.coord, { icon: ICONS.bus }).bindPopup("Metro<br />Next departure: 0:05");
          busMarkers.push(busMarker);
          return;
        case 'Tramway':
          const metroMarker = L.marker(item.coord, { icon: ICONS.metro }).bindPopup("Tramway");
          metroMarkers.push(metroMarker);
          return;
        case 'Velib':
          const bikeMarker = L.marker(item.coord, { icon: ICONS.bike }).bindPopup("VELIB");
          bikeMarkers.push(bikeMarker);
          return;
        case 'physical_mode:Car':
          const carMarker = L.marker(item.coord, { icon: ICONS.car }).bindPopup("Metro<br />Next departure: 0:05");
          carMarkers.push(carMarker);
          return;
        case 'RER':
          const trainMarker = L.marker(item.coord, { icon: ICONS.train }).bindPopup("RER");
          trainMarkers.push(trainMarker);
          return;
      }
    });
    this.metroLayer = L.layerGroup(metroMarkers);
    this.bikeLayer = L.layerGroup(bikeMarkers);
    this.busLayer = L.layerGroup(busMarkers);
    this.carLayer = L.layerGroup(carMarkers);
    this.trainLayer = L.layerGroup(trainMarkers);

    // initiate leaflet map
    const map = this.map = new L.Map('map', {
      zoomControl: false,
      zoom: 15,
      center: latlng,
      layers: [
        this.metroLayer,
        this.busLayer,
        this.bikeLayer,
        this.carLayer,
        this.trainLayer
      ],
      dragging: true,
      touchZoom: true,
      scrollWheelZoom: true,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: false
    });

    buildingMarker.addTo(map);

    let cartoDBPositron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });
    cartoDBPositron.addTo(map);
  }

  render() {
    return (
      <div
        className='full-height'
        style={{
          position: 'relative'
        }}>
        <Header
          style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 10
          }}
          title='Mobility'
          backButton />

        <div id='map' style={{
          height: '100%',
          color: '#000'
        }}>

        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          position: 'absolute',
          bottom: 0,
          minHeight: '8%',
          padding: '10px 0',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}
          >
          <FlatButton
            label={<FormattedMessage id='mobility.autolib' />}
            primary={this.state.carSelected}
            onTouchTap={() => {
              !this.state.carSelected ? this.map.addLayer(this.carLayer) : this.map.removeLayer(this.carLayer);
              this.setState({ carSelected: !this.state.carSelected });
            }}/>
          <FlatButton
            label={<FormattedMessage id='mobility.bus' />}
            primary={this.state.busSelected}
            onTouchTap={() => {
              !this.state.busSelected ? this.map.addLayer(this.busLayer) : this.map.removeLayer(this.busLayer);
              this.setState({ busSelected: !this.state.busSelected });
            }}/>
          <FlatButton
            label={<FormattedMessage id='mobility.metro' />}
            primary={this.state.metroSelected}
            onTouchTap={() => {
              !this.state.metroSelected ? this.map.addLayer(this.metroLayer) : this.map.removeLayer(this.metroLayer);
              this.setState({ metroSelected: !this.state.metroSelected });
            }}/>
          <FlatButton
            label={<FormattedMessage id='mobility.velib' />}
            primary={this.state.bikeSelected}
            onTouchTap={() => {
              !this.state.bikeSelected ? this.map.addLayer(this.bikeLayer) : this.map.removeLayer(this.bikeLayer);
              this.setState({ bikeSelected: !this.state.bikeSelected });
            }}/>
          <FlatButton
            label={<FormattedMessage id='mobility.train' />}
            primary={this.state.trainSelected}
            onTouchTap={() => {
              !this.state.trainSelected ? this.map.addLayer(this.trainLayer) : this.map.removeLayer(this.trainLayer);
              this.setState({ trainSelected: !this.state.trainSelected });
            }}/>
        </div>
      </div>
    );
  }
}

MobilityPage.propTypes = {
  building: PropTypes.object.isRequired
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(MobilityPage);
