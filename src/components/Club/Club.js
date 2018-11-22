import React from 'react';

import classes from './Club.module.css';

import clubLogo from '../../assets/ClubLogoMap';

const club = props => {
  return (
    <span className={classes.Club}>
      <img src={clubLogo[props.name]} alt="Logo of the club" />
      {props.name}
    </span>
  );
};

export default club;
