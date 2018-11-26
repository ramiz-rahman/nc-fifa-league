import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHandler = () => {
    this.setState(oldState => {
      return { showSideDrawer: !oldState.showSideDrawer };
    });
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Toolbar
          toggleSideDrawer={this.sideDrawerToggleHandler}
          authenticated={this.props.authenticated}
          registered={this.props.registered}
          logOut={this.props.logOut}
        />
        <SideDrawer
          opened={this.state.showSideDrawer}
          closeSideDrawer={this.sideDrawerCloseHandler}
          authenticated={this.props.authenticated}
          registered={this.props.registered}
          logOut={this.props.logOut}
        />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
