import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class RadioButtonContainer extends Component {

  constructor() {
    super();

    this.state = {
      currentSelection: undefined
    };
  }

  componentWillMount(props) {
    if (this.props.selected) {
      this.setState({currentSelection: this.props.selected});
    }
  }

  handleClick(possibility) {
    if (this.state.currentSelection === possibility) {
      this.setState({ currentSelection: undefined });
      this.props.onSelect(undefined);
    } else {
      this.setState({ currentSelection: possibility });
      this.props.onSelect(possibility);
    }
  };

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'space-between'
      }}>
        {this.props.possibilities.map((possibility, index) => {
          return (
            <RaisedButton
              label={possibility}
              secondary={this.state.currentSelection !== possibility}
              onTouchTap={this.handleClick.bind(this, possibility)}
              key={index}
              style={{
                width: '45%',
                marginTop: '20px'
              }} />
          );
        })}
      </div>
    );
  }
}

RadioButtonContainer.propTypes = {
  possibilities: PropTypes.array,
  onSelect: PropTypes.func.isRequired
};
RadioButtonContainer.defaultProps = {
  possibilities: []
};
export default RadioButtonContainer;
