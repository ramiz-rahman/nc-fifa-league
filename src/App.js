import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StandingsTable from './components/StandingsTable';
import Player from './components/Player';
import PlayerStatsTable from './components/PlayerStatsTable/PlayerStatsTable';
import Match from './components/Match/Match';
import Club from './components/Club/Club';

import fire from './fire';
import PlayerRegisterForm from './components/PlayerRegisterForm/PlayerRegisterForm';
import AddMatchForm from './components/AddMatchForm/AddMatchForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { players: [] }; // <- set up react state
  }

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

  render() {
    return (
      <div>
        <form onSubmit={this.registerPlayer.bind(this)}>
          <input type="text" name="playerName" />
          <input type="text" name="club" />
          <input type="submit" />
        </form>
        <PlayerStatsTable
          mp="12"
          w="10"
          d="2"
          l="0"
          pts="32"
          gf="36"
          ga="5"
          gd="31"
        />

        <PlayerRegisterForm />

        <AddMatchForm />
        <StandingsTable />

        <Match />
        <Match />
        <Match />
        <Match />
      </div>
    );
  }
}

export default App;
