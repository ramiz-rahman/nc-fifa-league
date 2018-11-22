import React, { Component } from 'react';
import classes from './StandingsTable.module.css';

import Club from '../Club/Club';

import fire from '../../fire';

class StandingsTable extends Component {
  state = {
    players: []
  };

  _getPlayers(playersObject) {
    let players = [];
    if (playersObject) {
      players = Object.keys(playersObject).map(
        playerID => playersObject[playerID]
      );
    }
    players.sort((p1, p2) => {
      if (p1.pts > p2.pts) return -1;
      else if (p1.pts < p2.pts) return 1;
      else if (p1.gd > p2.gd) return -1;
      else if (p1.gd < p2.gd) return 1;
      else if (p1.gf > p2.gf) return -1;
      else if (p1.gf < p2.gf) return 1;
      else if (p1.ga > p2.ga) return -1;
      else if (p1.ga < p2.ga) return 1;
      else return 0;
    });
    return players;
  }

  componentDidMount() {
    fire
      .database()
      .ref('players')
      .on('value', snapshot => {
        const playersObject = snapshot.val();
        const players = this._getPlayers(playersObject);
        this.setState({ players: players });
      });
  }

  render() {
    return (
      <div className={classes.StandingsTable}>
        <div className={classes.Fixed}>
          <table>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Player</th>
                <th scope="col" className={classes.hidden}>
                  Club
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.players.map((player, i) => (
                <tr key={player.name}>
                  <td>{i + 1}</td>
                  <td>{player.name}</td>
                  <td className={classes.hidden}>
                    <Club name={player.club} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={classes.Scrollable}>
          <table>
            <thead>
              <tr>
                <th scope="col">MP</th>
                <th scope="col">W</th>
                <th scope="col">D</th>
                <th scope="col">L</th>
                <th scope="col">Pts</th>
                <th scope="col">GF</th>
                <th scope="col">GA</th>
                <th scope="col">GD</th>
              </tr>
            </thead>
            <tbody>
              {this.state.players.map((player, i) => (
                <tr key={i}>
                  <td>{player.mp}</td>
                  <td>{player.w}</td>
                  <td>{player.d}</td>
                  <td>{player.l}</td>
                  <td>{player.pts}</td>
                  <td>{player.gf}</td>
                  <td>{player.ga}</td>
                  <td>{player.gd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StandingsTable;
