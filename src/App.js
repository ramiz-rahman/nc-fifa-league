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
    players: [],
    matches: [],
    showSideDrawer: false
  };

  componentWillMount() {
    const playersQuery = fire.database().ref('players');
    playersQuery.on('value', snapshot => {
      let players = Object.values(snapshot.val());
      this.setState({ players: players });
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
      this.setState({ matches: matches });
    });
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
        <div style={{ padding: '10px 0' }}>
          <StandingsTable />

          {this.state.matches.map((match, i) => (
            <Match
              key={i}
              homePlayerName={match.homePlayerName}
              homePlayerClub={
                this.state.players.find(
                  player => player.name === match.homePlayerName
                ).club
              }
              awayPlayerName={match.awayPlayerName}
              awayPlayerClub={
                this.state.players.find(
                  player => player.name === match.awayPlayerName
                ).club
              }
              homePlayerScore={match.homePlayerScore}
              awayPlayerScore={match.awayPlayerScore}
              datetime={match.datetime}
              number={this.state.matches.length - i}
            />
          ))}

          <AddMatchForm />
        </div>
      </div>
    );
  }
}

export default App;
