import React, { Component } from 'react';

import Match from '../../components/Match/Match';

class UpcomingMatches extends Component {
  state = {
    players: this.props.players,
    matches: this.props.matches,
    upcoming: []
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
    const upcomingMatches = this._generateMatches();
    this.setState({ upcoming: upcomingMatches });
  }

  render() {
    return (
      <div>
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
    );
  }
}

export default UpcomingMatches;
