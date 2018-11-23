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
    ]
  };

  _getSelectedClubs = players => {
    return Object.values(players).map(player => player.club);
  };

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
  };

  componentDidMount() {
    fire
      .database()
      .ref('players')
      .on('value', snapshot => {
        const players = snapshot.val();

        const selectedClubs = this._getSelectedClubs(players);

        this.setState(oldState => {
          return {
            clubs: oldState.clubs.filter(club => !selectedClubs.includes(club))
          };
        });
      });
  }

  render() {
    return (
      <form
        className={classes.PlayerRegisterForm}
        onSubmit={this.registerPlayer}
      >
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
