import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper';

import Header from '../Header';
import Title from '../Title';
import { Palette } from '../../theme';// TODO use the muiTheme in the context to get to the palette
import RadioButtonContainer from './RadioButtonContainer';
import { reportIncident } from '../../actions/reporting';
import ColorBackground from '../Backgrounds/ColorBackground';

class VerticalLinearStepper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      disableNext: true,
      what_selection: undefined,
      what_text: undefined,
      where_selection: undefined,
      where_text: undefined,
      extra: undefined,
      picture: undefined
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.renderStepContent = this.renderStepContent.bind(this);
    this.isNextButtonDisabled = this.isNextButtonDisabled.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  };

  handleNext() {
    const {stepIndex} = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      disableNext: true,
      finished: stepIndex >= 2
    });

    if (stepIndex >= 2) {
      this.handleFinish();
    }
  };

  handleFinish() {
    // send mail
    const where = [this.state.where_selection, this.state.where_text].filter(value => !!value);
    const what = [this.state.what_selection, this.state.what_text].filter(value => !!value);
    const params = {
      building: this.props.building.id,
      what: what.join(', '),
      where: where.join(', '),
      extraInfo: this.state.extra,
      picture: this.state.picture
    };
    this.props.reportIncident(params);
  };

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  isNextButtonDisabled(stepIndex) {
    switch (stepIndex) {
      case 0:
        return !(this.state.what_selection || this.state.what_text);
      case 1:
        return !(this.state.where_selection || this.state.where_text);
      case 2:
      default:
        return false;
    }
  }

  renderStepContent(step) {
    const {stepIndex} = this.state;

    switch (stepIndex) {
      case 0:
        return (<div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
          height: '30%'
        }}>
          <RadioButtonContainer
            key='whatRadioButtons'
            possibilities={["Temperature", "Noise", "Cleaning", "Broken", "Dangerous", "Urgent"]}
            selected={this.state.what_selection}
            onSelect={(value) => this.setState({ what_selection: value })} />
          <TextField
            key='whatTextField'
            floatingLabelText={<FormattedMessage id='report.somethingElse' />}
            fullWidth
            onChange={(event) => this.setState({ what_text: event.target.value })} />
        </div>);
      case 1:
        return (<div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
          height: '30%'
        }}>
          <RadioButtonContainer
            key='whereRadioButtons'
            possibilities={["Office", "Toilet", "Elevator", "Entrance", "Parking", "Outside"]}
            selected={this.state.where_selection}
            onSelect={(value) => this.setState({ where_selection: value })} />
          <TextField
            key='whereTextField'
            floatingLabelText={<FormattedMessage id='report.somewhereElse' />}
            fullWidth
            onChange={(event) => this.setState({ where_text: event.target.value })} />
        </div>);
      case 2:
        return (<div>
          <TextField
            floatingLabelText={<FormattedMessage id='report.extra' />}
            fullWidth
            onChange={ e => this.setState({ extra: e.target.value }) }
            />
          <RaisedButton
            label={<FormattedMessage id='report.button.drop' />}
            secondary
            fullWidth />
        </div>);
    }
  }

  render() {
    const {stepIndex} = this.state;
    const LabelStyle = {
      flexDirection: 'column',
      justifyContent: 'space-around'
    };

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        marginBottom: '40px'
      }}>
        <div style={{ flexGrow: 1 }}>
          {this.renderStepContent(stepIndex)}
        </div>

        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel className='steplabel' style={LabelStyle} >
              {<FormattedMessage id='report.what' />}
            </StepLabel>
          </Step>
          <Step>
            <StepLabel className='steplabel' style={LabelStyle}>
              {<FormattedMessage id='report.where' />}
            </StepLabel>
          </Step>
          <Step>
            <StepLabel className='steplabel' style={LabelStyle}>
              {<FormattedMessage id='report.extra' />}
            </StepLabel>
          </Step>
        </Stepper>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
          {stepIndex > 0 ? (
            <FlatButton
              label={<FormattedMessage id='report.button.previous' />}
              disabled={stepIndex === 0}
              onTouchTap={this.handlePrev}
              style={{ marginRight: 12 }}
              />
          ) : (<div></div>)}
          <RaisedButton
            label={stepIndex === 2 ? <FormattedMessage id='report.button.finish' /> : <FormattedMessage id='report.button.next' />}
            primary
            onTouchTap={this.handleNext}
            disabled={this.isNextButtonDisabled(stepIndex)} />

        </div>

      </div>

    );
  }
}

class ProblemReportPage extends Component {

  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reporting.isReported) {
      this.setState({
        open: nextProps.reporting.isReported
      });
    }
  }

  render() {
    return (
      <ColorBackground>
        <div
          className='page'
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Header
            backButton
            />
          <Title
            title={<FormattedMessage id='report.title' />}
            icon='fa-bullhorn'
            style={{ height: '15%' }} />
          <VerticalLinearStepper {...this.props} />
          <Snackbar
            open={this.state.open}
            message={<FormattedMessage id='report.message' />}
            bodyStyle={{ color: Palette.alternateTextColor }}
            autoHideDuration={4000}
            onRequestClose={() => this.context.router.push('/')}
          />
        </div>
      </ColorBackground>
    );
  }

}
ProblemReportPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    index: state.index,
    building: state.building.current,
    reporting: state.reporting
  };
};
export default connect(mapStateToProps, {reportIncident})(ProblemReportPage);
