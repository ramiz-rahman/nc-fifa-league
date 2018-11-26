import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div>
        <DrawerToggle onClick={props.toggleSideDrawer} />
        <Logo />
        <nav>
          <NavigationItems
            authenticated={props.authenticated}
            registered={props.registered}
            logOut={props.logOut}
          />
        </nav>
      </div>
    </header>
  );
};

export default toolbar;
