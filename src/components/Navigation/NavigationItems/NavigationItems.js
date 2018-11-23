import React from 'react';
import classes from './NavigationItems.module.css';

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <li>
        <a href="/">Standings</a>
      </li>
      <li>
        <a href="/">Past Matches</a>
      </li>
      <li>
        <a href="/">Upcoming</a>
      </li>
      <li>
        <a href="/">Register</a>
      </li>
    </ul>
  );
};

export default navigationItems;
