import React, { Component } from 'react';
import classes from './Match.module.css';

import manCity from '../../assets/logo/man_city.png';
import manUtd from '../../assets/logo/man_utd.png';

class Match extends Component {
  state = {
    homePlayer: {
      name: 'Ramiz',
      score: 3
    },
    awayPlayer: {
      name: 'Pratik',
      score: 1
    },
    matchNumber: 4,
    date: '07/11/18'
  };
  render() {
    return (
      <div className={classes.Match}>
        <div>
          <div>
            <p className={classes.Player}>
              <img src={manCity} alt="Home Player's Team" />
              {this.state.homePlayer.name}
            </p>
            <p>{this.state.homePlayer.score}</p>
          </div>
          <div>
            <p className={classes.Player}>
              <img src={manUtd} alt="Home Player's Team" />
              {this.state.awayPlayer.name}
            </p>
            <p>{this.state.awayPlayer.score}</p>
          </div>
        </div>

        <div className={classes.Time}>
          <p>
            <strong>{this.state.matchNumber}</strong>
          </p>
          <p>
            <time>{this.state.date}</time>
          </p>
        </div>
      </div>
    );
  }
}

export default Match;
