import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { retrieveBuilding } from '../../actions/building';
import { getUser } from '../../actions/user';
import Header from '../Header';
import Title from '../Title';
import MobilityWidgets from './MobilityWidgets';
import ButtonBar from './ButtonBar';
import ColorBackground from '../Backgrounds/ColorBackground';
import ErrorMessage from '../Features/ErrorMessage';

class HomePage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			error: null,
			showMessage: false
		};
	}

	componentDidMount() {
		if (!localStorage.buildingId) {
			this.context.router.push('/select-building');
		} else {
			this.props.retrieveBuilding();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.index.error) {
			this.setState({
				error: nextProps.index.error,
				showMessage: true
			});
		}
	}

	closeErrorMessage() {
		if(this.props.index.error === 403) {
			this.context.router.replace('/login');
		}
		this.setState({
			error: null,
			showMessage: false
		});
	}

  render() {
		const buildingName = this.props.building.current.name;
		const user = localStorage.getObject('user');
    return (
      <ColorBackground>
        <div className='page'>
          <Header style={{
            height: '10%'
          }} title={buildingName} menu/>
          <Title
						title={<FormattedMessage id='homepage.hello' values={{name: user.firstName}} />}
						subtitle={<FormattedMessage id='homepage.notification' values={{
							number: 2,
							bookingText: <FormattedPlural value={2} one='booking' other='bookings' />
						}} />}
						style={{height: '15%'}} />
          <MobilityWidgets style={{
            height: '20%'
          }}/>
          <ButtonBar style={{
            height: '20%'
          }}/>
        </div>
				<ErrorMessage
					error={this.state.error}
					open={this.state.showMessage}
					handleClose={this.closeErrorMessage.bind(this)}/>
      </ColorBackground>
    );
  }
}

HomePage.propTypes = {
	building: PropTypes.object,
	retrieveBuilding: PropTypes.func
};

HomePage.contextTypes = {
	router: PropTypes.object.isRequired
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, {retrieveBuilding, getUser})(HomePage);
