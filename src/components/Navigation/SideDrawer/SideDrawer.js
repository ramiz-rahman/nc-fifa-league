import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
  let state = props.opened ? classes.Opened : classes.Closed;
  let attachedClasses = [classes.SideDrawer, state].join(' ');
  return (
    <div>
      <Backdrop show={props.opened} onClick={props.closeSideDrawer} />
      <div className={attachedClasses}>
        <div onClick={props.closeSideDrawer} />
        <nav>
          <NavigationItems
            authenticated={props.authenticated}
            registered={props.registered}
            logOut={props.logOut}
          />
        </nav>
      </div>
    </div>
  );
};

export default sideDrawer;
