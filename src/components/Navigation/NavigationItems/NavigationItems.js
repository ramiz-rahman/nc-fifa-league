import React from 'react';
import classes from './NavigationItems.module.css';

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <li>
        <a href="/">Standings</a>
      </li>
      <li>
        <a href="/past-matches">Past Matches</a>
      </li>
      <li>
        <a href="/upcoming">Upcoming</a>
      </li>
      <li>
        <a href="/register">Register</a>
      </li>
    </ul>
  );
};

export default navigationItems;
