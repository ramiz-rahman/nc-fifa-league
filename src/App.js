import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import fire from './fire';
import './App.css';

import StandingsTable from './components/StandingsTable/StandingsTable';

import PlayerRegisterForm from './components/PlayerRegisterForm/PlayerRegisterForm';
import AddMatchForm from './components/AddMatchForm/AddMatchForm';
import Layout from './containers/Layout/Layout';
import PastMatches from './containers/PastMatches/PastMatches';
import UpcomingMatches from './containers/UpcomingMathces/UpcomingMatches';

class App extends Component {
  state = {
    players: [],
    matches: []
  };

  componentDidMount() {
    const playersQuery = fire.database().ref('players');
    playersQuery.on('value', snapshot => {
      let players = Object.values(snapshot.val());
      this.setState(() => ({ players: players }));
    });

    const matchesQuery = fire
      .database()
      .ref('matches')
      .orderByChild('datetime');
    matchesQuery.on('value', snapshot => {
      let matches = Object.values(snapshot.val());
      matches.sort((m1, m2) => {
        if (m1.datetime > m2.datetime) return -1;
        else if (m1.datetime < m2.datetime) return 1;
        else return 0;
      });
      this.setState(() => ({ matches: matches }));
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <StandingsTable players={this.state.players} />}
            />
            <Route
              path="/past-matches"
              render={() => (
                <PastMatches
                  players={this.state.players}
                  matches={this.state.matches}
                />
              )}
            />
            <Route
              path="/upcoming"
              render={() => (
                <UpcomingMatches
                  players={this.state.players}
                  matches={this.state.matches}
                />
              )}
            />
            <Route path="/register" component={PlayerRegisterForm} />
            <Route path="/add-match" component={AddMatchForm} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
