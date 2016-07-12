import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { FormattedMessage } from 'react-intl';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

class ButtonGroup extends Component {
	render() {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column'
			}}>
				{
					this.props.buttons.map((button, index) => {
						return (<RaisedButton
							label={button.label}
							secondary
							onTouchTap={button.link}
							fullWidth
							key={index}
							style={{
								marginTop: '20px'
							}}
							/>);
					})
				}
			</div>
		);
	}
}

class ButtonBar extends Component {

	constructor() {
		super();

		this.state = {
			showButtons: undefined
		};

		this.toggleButtons = this.toggleButtons.bind(this);
	}

	toggleButtons(buttonName) {
		if (this.state.showButtons === buttonName) {
			this.setState({ showButtons: undefined });
		} else {
			this.setState({ showButtons: buttonName });
		}
	}

	render() {
		const styles = {
			container: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'nowrap',
				justifyContent: 'space-around',
				height: '30%',
				width: '300px',
				alignItems: 'center',
				margin: '0 auto'
			},
      icon: {
        fontSize: '30px'
      }
		};

		return (
			<div style={{
				height: '50%',
				display: 'flex',
				flexDirection: 'column'
			}}>
				<div style={styles.container}>
					<FloatingActionButton
						onTouchTap={() => this.toggleButtons("live")}>
						<FontIcon
							className='fa fa-cutlery bigIcon'
							aria-hidden='true' />
					</FloatingActionButton>

					<FloatingActionButton
						onTouchTap={() => this.toggleButtons("work")}>
						<FontIcon
							className='fa fa-briefcase bigIcon'
							aria-hidden='true' />
					</FloatingActionButton>

					<FloatingActionButton
						onTouchTap={() => this.toggleButtons("move")}>
						<FontIcon
							className='fa fa-car bigIcon'
							aria-hidden='true' />
					</FloatingActionButton>
				</div>
				{this.state.showButtons === "work" && (
					<ButtonGroup
						buttons={[
							{ label: <FormattedMessage id='homepage.buttonBar.report' />, link: () => this.props.router.push("report") },
							{ label: <FormattedMessage id='homepage.buttonBar.meeting' />, link: () => alert('coming soon!') }
						]}/>
				)}
				{this.state.showButtons === "live" && (
					<ButtonGroup
						buttons={[
							{ label: <FormattedMessage id='homepage.buttonBar.restaurant' />, link: () => alert('coming soon!') },
							{ label: <FormattedMessage id='homepage.buttonBar.services' />, link: () => this.props.router.push("services") }
						]} />
				)}
				{this.state.showButtons === "move" && (
					<ButtonGroup
						buttons={[
							{ label: <FormattedMessage id='homepage.buttonBar.map' />, link: () => this.props.router.push("mobility") }
						]} />
				)}
			</div>
		);
	}
}

export default withRouter(ButtonBar);
