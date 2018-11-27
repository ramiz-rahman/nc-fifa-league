import React from 'react';
import classes from './NavigationItems.module.css';
import { NavLink } from 'react-router-dom';
import ADMINS from '../../../Admins';

const navigationItems = props => {
  let signedInOnly = [
    <li key="Sign Out" onClick={props.logOut} className={classes.Auth}>
      <NavLink to="/">Sign Out</NavLink>
    </li>
  ];
  if (props.authenticated && ADMINS.includes(props.authenticated.email)) {
    signedInOnly.unshift(
      <li key="Add Match">
        <NavLink to="/add-match" activeClassName={classes.Active}>
          Add Match
        </NavLink>
      </li>
    );
  }
  if (!props.registered) {
    signedInOnly.unshift(
      <li key="Register">
        <NavLink to="/register" activeClassName={classes.Active}>
          Register
        </NavLink>
      </li>
    );
  }

  return (
    <ul className={classes.NavigationItems}>
      <li>
        <NavLink to="/" exact activeClassName={classes.Active}>
          Standings
        </NavLink>
      </li>
      <li>
        <NavLink to="/past-matches" exact activeClassName={classes.Active}>
          Past Matches
        </NavLink>
      </li>
      <li>
        <NavLink to="/upcoming" exact activeClassName={classes.Active}>
          Upcoming
        </NavLink>
      </li>
      {props.authenticated ? (
        signedInOnly
      ) : (
        <li className={classes.Auth}>
          <NavLink to="/sign-in">Sign In</NavLink>
        </li>
      )}
    </ul>
  );
};

export default navigationItems;
