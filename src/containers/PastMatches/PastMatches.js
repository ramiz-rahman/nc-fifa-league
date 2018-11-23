import React, { Component } from 'react';

import Match from '../../components/Match/Match';

class PastMatches extends Component {
  state = {
    players: this.props.players,
    matches: this.props.matches
  };

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
