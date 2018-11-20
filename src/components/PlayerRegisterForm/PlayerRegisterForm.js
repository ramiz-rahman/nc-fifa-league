import React, { Component } from 'react';
import classes from './PlayerRegisterForm.module.css';
import fire from '../../fire';

class PlayerRegisterForm extends Component {
  state = {
    clubs: [
      'AC Milan',
      'Arsenal',
      'AS Roma',
      'Athletico Madrid',
      'Barcelona',
      'Bayern Munich',
      'Chelsea',
      'Dortmund',
      'Inter Milan',
      'Juventus',
      'Liverpool',
      'Lyon',
      'Manchester City',
      'Manchester United',
      'Monaco',
      'Napoli',
      'PSG',
      'Real Madrid',
      'Sevilla',
      'Tottenham'
    ],

    message: null
  };

  _getSelectedClubs = players => {
    let clubs = [];
    if (players) {
      Object.keys(players).map(player => clubs.push(players[player].club));
    }
    return clubs;
  };

  componentDidMount() {
    const root = fire.database().ref();
    const playersRef = root.child('players');

    playersRef.on('value', snapshot => {
      let players = snapshot.val();

      // Collect selected clubs
      const selectedClubs = this._getSelectedClubs(players);

      this.setState(oldState => {
        return {
          clubs: oldState.clubs.filter(club => !selectedClubs.includes(club))
        };
      });
    });
  }

  registerPlayer = e => {
    const player = new FormData(e.target);
    fire
      .database()
      .ref('players')
      .push({
        name: player.get('name'),
        club: player.get('club'),
        mp: 0,
        w: 0,
        d: 0,
        l: 0,
        pts: 0,
        gf: 0,
        ga: 0,
        gd: 0
      });

    this.setState({ message: `${player.get('name')} has been registered` });
  };

  render() {
    return (
      <form
        className={classes.PlayerRegisterForm}
        onSubmit={this.registerPlayer}
      >
        <p>{this.state.message}</p>
        <p>
          <input type="text" name="name" placeholder="Your Name" />
          <select name="club">
            {this.state.clubs.map(club => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>
          <input type="submit" />
        </p>
      </form>
    );
  }
}

export default PlayerRegisterForm;
