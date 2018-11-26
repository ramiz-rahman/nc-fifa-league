import React, { Component } from 'react';
import classes from './AddMatchForm.module.css';
import fire from '../../fire';

class AddMatchForm extends Component {
  state = {
    playerNames: []
  };

  _getUpdatedStats = ({ oldStats, goalsScored, goalsConceded }) => {
    let stats = {
      mp: oldStats.mp + 1,
      gf: oldStats.gf + goalsScored,
      ga: oldStats.ga + goalsConceded,
      gd: oldStats.gd + goalsScored - goalsConceded
    };

    if (goalsScored > goalsConceded) {
      stats.w = oldStats.w + 1;
      stats.pts = oldStats.pts + 3;
    } else if (goalsScored < goalsConceded) {
      stats.l = oldStats.l + 1;
    } else {
      stats.d = oldStats.l + 1;
      stats.pts = oldStats.pts + 1;
    }

    return stats;
  };

  _getPlayerNames = players => {
    return Object.values(players).map(player => player.name);
  };

  addMatch = event => {
    event.preventDefault();

    const matchData = new FormData(event.target);

    const root = fire.database().ref();
    const matchRef = root.child(
      `matches/${matchData.get('homePlayerName')}-${matchData.get(
        'awayPlayerName'
      )}`
    );

    // Save match
    matchRef.set({
      homePlayerName: matchData.get('homePlayerName'),
      awayPlayerName: matchData.get('awayPlayerName'),
      homePlayerScore: parseInt(matchData.get('homePlayerScore')),
      awayPlayerScore: parseInt(matchData.get('awayPlayerScore')),
      datetime: Date.now()
    });

    // Update Home Player
    const homePlayerRef = root
      .child('players')
      .orderByChild('name')
      .equalTo(matchData.get('homePlayerName'));

    homePlayerRef.once('value', snapshot => {
      const player = snapshot.val();
      const playerID = Object.keys(player)[0];

      const updatedStats = this._getUpdatedStats({
        oldStats: player[playerID],
        goalsScored: parseInt(matchData.get('homePlayerScore')),
        goalsConceded: parseInt(matchData.get('awayPlayerScore'))
      });

      fire
        .database()
        .ref(`players/${playerID}`)
        .update(updatedStats);
    });

    // Update Away Player
    const awayPlayerRef = root
      .child('players')
      .orderByChild('name')
      .equalTo(matchData.get('awayPlayerName'));

    awayPlayerRef.once('value', snapshot => {
      const player = snapshot.val();
      const playerID = Object.keys(player)[0];

      const updatedStats = this._getUpdatedStats({
        oldStats: player[playerID],
        goalsScored: parseInt(matchData.get('awayPlayerScore')),
        goalsConceded: parseInt(matchData.get('homePlayerScore'))
      });

      fire
        .database()
        .ref(`players/${playerID}`)
        .update(updatedStats);
    });

    // Redirect to Standings Table
    this.props.history.push('/');
  };

  componentDidMount() {
    fire
      .database()
      .ref('players')
      .orderByChild('name')
      .on('value', snapshot => {
        const players = snapshot.val();
        const playerNames = this._getPlayerNames(players);
        this.setState({ playerNames: playerNames });
      });
  }

  render() {
    return (
      <form className={classes.AddMatchForm} onSubmit={this.addMatch}>
        <p>
          <label htmlFor="homePlayerName">Player 1</label>
          <select type="text" name="homePlayerName">
            {this.state.playerNames.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <input type="text" name="homePlayerScore" placeholder="Score" />
        </p>
        <p>
          <label htmlFor="awayPlayerName">Player 2</label>
          <select type="text" name="awayPlayerName">
            {this.state.playerNames.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <input type="text" name="awayPlayerScore" placeholder="Score" />
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    );
  }
}

export default AddMatchForm;
