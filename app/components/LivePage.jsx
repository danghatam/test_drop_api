import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ColorBackground from './Backgrounds/ColorBackground';

class LivePage extends Component {

  constructor(props) {
    super(props);

    const ipsum = "lorem ipsum dolor sid amed, lorum ipsum dolor sid amed, lorum ipsum dolor sid amed";

    this.state = {
      restaurants: [
        {
          name: "Bella italia",
          description: ipsum
        }, {
          name: "Restaurant 2",
          description: ipsum
        }, {
          name: "Restaurant 3",
          description: ipsum
        }],
      fitnesses: [
        {
          name: "Pump it",
          description: ipsum
        }, {
          name: "Basic fit",
          description: ipsum
        }, {
          name: "Time release",
          description: ipsum
        }
      ]
    };
  }

  render() {
    return (
      <ColorBackground>
        <div
          className='full-height'>

          <AppBar
            title='Live'
            iconElementLeft={<IconButton><FontIcon className='fa fa-chevron-left' aria-hidden='true' /></IconButton>}
            onLeftIconButtonTouchTap={() => this.props.router.goBack()} />
          <List>
            <Subheader>Restaurants</Subheader>
            {this.state.restaurants.map(function (restaurant, i) {
              const divider = i > 0
                ? <Divider />
                : null;
              return (
                <div key={i}>
                  {divider}
                  <ListItem
                    primaryText={restaurant.name}
                    secondaryText={restaurant.description}
                    />
                </div>
              );
            })}

            <Subheader>Fitness</Subheader>
            {this.state.fitnesses.map(function (fitness, i) {
              const divider = i > 0
                ? <Divider />
                : null;
              return (
                <div key={i}>
                  {divider}
                  <ListItem
                    primaryText={fitness.name}
                    secondaryText={fitness.description}
                    />
                </div>
              );
            })}
          </List>

        </div>
      </ColorBackground>
    );
  }
}

export default withRouter(LivePage);
