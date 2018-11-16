import React, { Component } from 'react';
import classes from './StandingsTable.module.css';

class StandingsTable extends Component {
  state = {
    players: [
      {
        name: 'Ramiz',
        club: 'Real Madrid',
        mp: 12,
        w: 10,
        d: 2,
        l: 0,
        pts: 32,
        gf: 36,
        ga: 5,
        gd: 31
      },
      {
        name: 'Zulfikar',
        club: 'Manchester United',
        mp: 12,
        w: 6,
        d: 2,
        l: 4,
        pts: 20,
        gf: 36,
        ga: 5,
        gd: 31
      },
      {
        name: 'Sabit',
        club: 'PSG',
        mp: 12,
        w: 6,
        d: 2,
        l: 4,
        pts: 20,
        gf: 36,
        ga: 5,
        gd: 31
      }
    ]
  };

  asTableCells(player) {
    const playerData = Object.keys(player).map(key => (
      <td key={key.toString()}>{player[key]}</td>
    ));
    return playerData;
  }

  render() {
    return (
      <table className={classes.StandingsTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Club</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
          </tr>
        </thead>
        <tbody>
          {this.state.players.map((player, i) => (
            <tr key={i}>
              <td key="rank">{i}</td>
              {this.asTableCells(player)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default StandingsTable;
