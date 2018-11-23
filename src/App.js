import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import fire from './fire';
import './App.css';

import StandingsTable from './components/StandingsTable/StandingsTable';
import Player from './components/Player/Player';
import PlayerStatsTable from './components/PlayerStatsTable/PlayerStatsTable';
import Match from './components/Match/Match';
import Club from './components/Club/Club';

import PlayerRegisterForm from './components/PlayerRegisterForm/PlayerRegisterForm';
import AddMatchForm from './components/AddMatchForm/AddMatchForm';
import Layout from './containers/Layout/Layout';
import PastMatches from './containers/PastMatches/PastMatches';
import UpcomingMatches from './containers/UpcomingMathces/UpcomingMatches';

class App extends Component {
  state = {
    players: [],
    matches: [],
    upcoming: []
  };

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <div style={{ padding: '10px 0' }}>
            <StandingsTable />

            <PastMatches
              players={this.state.players}
              matches={this.state.players}
            />
            <AddMatchForm />
            <PlayerRegisterForm />

            <UpcomingMatches
              players={this.state.players}
              matches={this.state.matches}
            />
          </div>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
