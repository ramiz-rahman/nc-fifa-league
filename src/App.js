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
    upcoming: [],
    showSideDrawer: false
  };

  _generateMatches = () => {
    let upcoming = [];
    let players = this.state.players;
    players.sort((p1, p2) => {
      if (p1.mp > p2.mp) return 1;
      else if (p1.mp < p2.mp) return -1;
      else return 0;
    });

    for (let i = 0; i < players.length; i++) {
      for (let j = 1; j < players.length; j++) {
        let homePlayerName = players[i].name;
        let homePlayerClub = players[i].club;
        let awayPlayerName = players[(i + j) % players.length].name;
        let awayPlayerClub = players[(i + j) % players.length].club;
        if (
          this.state.matches.find(match => {
            return (
              match.homePlayerName === homePlayerName &&
              match.awayPlayerName === awayPlayerName
            );
          })
        ) {
        } else {
          upcoming.push({
            homePlayerName,
            homePlayerClub,
            awayPlayerName,
            awayPlayerClub
          });
          break;
        }
      }
    }

    return upcoming;
  };

  componentDidMount() {
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
      const upcomingMatches = this._generateMatches();
      this.setState({ upcoming: upcomingMatches });
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
              key={`${match.homePlayerName}-${match.awayPlayerName}`}
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
          <PlayerRegisterForm />

          {this.state.upcoming.map((match, i) => (
            <Match
              key={`${match.homePlayerName}-${match.awayPlayerName}`}
              homePlayerName={match.homePlayerName}
              homePlayerClub={match.homePlayerClub}
              awayPlayerName={match.awayPlayerName}
              awayPlayerClub={match.awayPlayerClub}
              homePlayerScore={null}
              awayPlayerScore={null}
              datetime={null}
              number={this.state.matches.length + i + 1}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
