import React, { Component } from 'react';
import classes from './StandingsTable.module.css';

import Club from '../Club/Club';

class StandingsTable extends Component {
  state = {
    players: [
      {
        name: 'Ramiz',
        club: 'Real Madrid',
        stats: {
          mp: 12,
          w: 10,
          d: 2,
          l: 0,
          pts: 32,
          gf: 36,
          ga: 5,
          gd: 31
        }
      },
      {
        name: 'Zulfikar',
        club: 'Manchester United',
        stats: {
          mp: 12,
          w: 6,
          d: 2,
          l: 4,
          pts: 20,
          gf: 36,
          ga: 5,
          gd: 31
        }
      },
      {
        name: 'Sabit',
        club: 'PSG',
        stats: {
          mp: 12,
          w: 6,
          d: 2,
          l: 4,
          pts: 20,
          gf: 36,
          ga: 5,
          gd: 31
        }
      }
    ]
  };

  asTableCells(stats) {
    const statsData = Object.keys(stats).map(key => (
      <td key={key.toString()}>{stats[key]}</td>
    ));
    return statsData;
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
                  <td>{i}</td>
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
                <tr key={i}>{this.asTableCells(player.stats)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StandingsTable;
