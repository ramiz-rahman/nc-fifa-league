import React from 'react';
import classes from './Match.module.css';
import clubLogo from '../../assets/ClubLogoMap';
import moment from 'moment';

const match = props => {
  return (
    <div className={classes.Match}>
      <div>
        <div>
          <p className={classes.Player}>
            <img
              src={clubLogo[props.homePlayerClub]}
              alt="Home Player's Team"
            />
            {props.homePlayerName}
          </p>
          <p>{props.homePlayerScore}</p>
        </div>
        <div>
          <p className={classes.Player}>
            <img
              src={clubLogo[props.awayPlayerClub]}
              alt="Away Player's Team"
            />
            {props.awayPlayerName}
          </p>
          <p>{props.awayPlayerScore}</p>
        </div>
      </div>

      <div className={classes.Time}>
        <p>
          <strong>{props.number}</strong>
        </p>
        <p>
          <time>{moment(props.datetime).calendar()}</time>
        </p>
      </div>
    </div>
  );
};

export default match;
