import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StandingsTable from './components/StandingsTable';
import Player from './components/Player';
import PlayerStatsTable from './components/PlayerStatsTable/PlayerStatsTable';
import Match from './components/Match/Match';

class App extends Component {
  render() {
    return (
      <div>
        <Player />
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

        <Match />
        <Match />
        <Match />
        <Match />
      </div>
    );
  }
}

export default App;
