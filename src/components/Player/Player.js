import React, { Component } from 'react';
import classes from './Player.module.css';
import thumbnail from '../../assets/ramiz-thumbnail.jpg';

class Player extends Component {
  state = {
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
  };

  render() {
    return (
      <div className={classes.Player}>
        <img src={thumbnail} alt="" />
        <div>
          <h1>{this.state.name}</h1>
          <p>{this.state.club}</p>
        </div>
      </div>
    );
  }
}

export default Player;
