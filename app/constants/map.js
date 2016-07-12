import L from 'leaflet';

export const ICONS = {
  metro: L.AwesomeMarkers.icon({
    icon: 'subway',
    prefix: 'fa',
    markerColor: 'black'
  }),
  bike: L.AwesomeMarkers.icon({
    icon: 'bicycle',
    prefix: 'fa',
    markerColor: 'black'
  }),
  bus: L.AwesomeMarkers.icon({
    icon: 'bus',
    prefix: 'fa',
    markerColor: 'black'
  }),
  car: L.AwesomeMarkers.icon({
    icon: 'car',
    prefix: 'fa',
    markerColor: 'black'
  }),
  train: L.AwesomeMarkers.icon({
    icon: 'train',
    prefix: 'fa',
    markerColor: 'black'
  }),
  building: L.AwesomeMarkers.icon({
    icon: 'building',
    prefix: 'fa',
    markerColor: 'blue'
  })
};
