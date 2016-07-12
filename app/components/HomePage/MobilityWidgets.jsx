import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Widget from './Widget';
import * as BuildingActions from '../../actions/building';
import TimeHelper from '../../helpers/time';
import { PHYSICAL_MODES } from '../../../config';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '20%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

class MobilityWidgets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busEta: 0,
      tramwayEta: 0
    };
  }

  componentWillMount() {
    this.findNext();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.eta !== nextProps.eta) {
      const bus = nextProps.eta[PHYSICAL_MODES.bus]
                  ? nextProps.eta[PHYSICAL_MODES.bus].find(item => item.eta > 0)
                  : null;
      const tramway = nextProps.eta[PHYSICAL_MODES.tramway]
                      ? nextProps.eta[PHYSICAL_MODES.tramway].find(item => item.eta > 0)
                      : null;
      const busEta = bus ? bus.eta : 0;
      const tramwayEta = tramway ? tramway.eta : 0;
      const scheduleTime = busEta < tramwayEta ? busEta : tramwayEta;
      if (scheduleTime > 0) setTimeout(this.findNext.bind(this), scheduleTime * 1000 * 60);
      this.setState({
        busEta: busEta,
        tramwayEta: tramwayEta
      });
    }
  }

  findNext() {
    this.props.dispatch(BuildingActions.findEtaNextTransports());
  };

	render() {
    const eta = this.props.eta;
    const busEta = eta[PHYSICAL_MODES.bus] ? TimeHelper.formatToString(this.state.busEta) : '∞';
    const tramwayEta = eta[PHYSICAL_MODES.tramway] ? TimeHelper.formatToString(this.state.tramwayEta) : '∞';
		return (
			<div style={styles.container}>
        <div style={styles.row}>
          <Widget
            title={<FormattedMessage id='homepage.mobility.maison' />}
            value='0:55'
            icon='fa-map-marker' />
					<Widget
            title={<FormattedMessage id='homepage.mobility.bus' />}
            value={busEta}
            icon='fa-bus'
            right/>
        </div>
        <div style={styles.row}>
					<Widget
            title={<FormattedMessage id='homepage.mobility.metro' />}
            value={tramwayEta}
            icon='fa-subway' />
					<Widget
            title={<FormattedMessage id='homepage.mobility.velib' />}
            value='10/25'
            icon='fa-bicycle'
            right />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(MobilityWidgets);
