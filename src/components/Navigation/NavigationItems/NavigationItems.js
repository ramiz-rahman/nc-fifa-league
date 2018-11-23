import React from 'react';
import classes from './NavigationItems.module.css';
import { NavLink } from 'react-router-dom';

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <li>
        <NavLink to="/" exact>
          Standings
        </NavLink>
      </li>
      <li>
        <NavLink to="/past-matches" exact>
          Past Matches
        </NavLink>
      </li>
      <li>
        <NavLink to="/upcoming" exact>
          Upcoming
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" exact>
          Register
        </NavLink>
      </li>
    </ul>
  );
};

export default navigationItems;
