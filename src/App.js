import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StandingsTable from './components/StandingsTable/StandingsTable';
import Player from './components/Player/Player';
import PlayerStatsTable from './components/PlayerStatsTable/PlayerStatsTable';
import Match from './components/Match/Match';
import Club from './components/Club/Club';

import fire from './fire';
import PlayerRegisterForm from './components/PlayerRegisterForm/PlayerRegisterForm';
import AddMatchForm from './components/AddMatchForm/AddMatchForm';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';

class App extends Component {
  state = {
    showSideDrawer: false
  };

  componentWillMount() {
    let db = fire.database();
    let player = db.ref('Players/');
    player.on('value', snapshot => {
      this.setState({ players: snapshot.val() });
    });
    console.log(this.state.players);
    console.log(typeof this.state.players);
  }

  registerPlayer(event) {
    event.preventDefault();
    let player = new FormData(event.target);
    let db = fire.database();
    db.ref('players').push({
      name: player.get('playerName'),
      club: player.get('club')
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState(oldState => {
      return { showSideDrawer: !oldState.showSideDrawer };
    });
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer
          opened={this.state.showSideDrawer}
          closeSideDrawer={this.sideDrawerCloseHandler}
        />
      </div>
    );
  }
}

export default App;
