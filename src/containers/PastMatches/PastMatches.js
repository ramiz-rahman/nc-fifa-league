import React, { Component } from 'react';
import fire from '../../fire';

import Match from '../../components/Match/Match';

class PastMatches extends Component {
  state = {
    players: this.props.players,
    matches: this.props.players
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
    });
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default PastMatches;
