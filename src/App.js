import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import fire from './fire';
import './App.css';

import StandingsTable from './components/StandingsTable/StandingsTable';

import PlayerRegisterForm from './components/PlayerRegisterForm/PlayerRegisterForm';
import AddMatchForm from './components/AddMatchForm/AddMatchForm';
import Layout from './containers/Layout/Layout';
import PastMatches from './containers/PastMatches/PastMatches';
import UpcomingMatches from './containers/UpcomingMathces/UpcomingMatches';
import SignIn from './components/Auth/SignIn/SignIn';

class App extends Component {
  state = {
    players: [],
    matches: [],
    currentUser: null
  };

  logIn = () => {};

  logOutHandler = e => {
    e.preventDefault();
    fire
      .auth()
      .signOut()
      .then(function() {
        this.setState({ currentUser: null });
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user });
      } else {
        this.setState({ currentUser: null });
      }
    });

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

  userIsRegistered = () => {
    let registered = false;
    if (this.state.currentUser) {
      this.state.players.forEach(player => {
        if (player.uid === this.state.currentUser.uid) registered = true;
      });
    }
    return registered;
  };

  render() {
    return (
      <BrowserRouter>
        <Layout
          authenticated={this.state.currentUser}
          registered={this.userIsRegistered()}
          logOut={this.logOutHandler}
        >
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
            <Route path="/sign-in" component={SignIn} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
