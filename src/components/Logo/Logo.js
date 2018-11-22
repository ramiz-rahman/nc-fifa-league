import React from 'react';
import nc from '../../assets/nc_logo.png';
import fifa from '../../assets/fifa_logo.png';
import classes from './Logo.module.css';

const logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={nc} alt="NewsCred Logo" />
      <img src={fifa} alt="FIFA Logo" />
    </div>
  );
};

export default logo;
