import React from 'react';
import {
  Link
} from "react-router-dom";
// import Home from '../../../../home/Home';
// import Login from '../../../../login/Login';
// import Register from '../../../../register/Register';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
      <div className={classes.sideMenuOuter}>
        <div className='side-menu'>
          <div className='logo'>
            <img src=''/>
            <div className={classes.appName}>.taskez</div>
            <ul className={classes.menuItemOuter}>
              <li className={classes.menuItem}><img src='home.svg'/> Overview</li>
              <li className={classes.menuItem}><img src='stats.svg'/> Stats</li>
              <li className={classes.menuItemActive}><img src='folder.svg'/> Projects</li>
              <li className={classes.menuItem}><img src='chats.svg'/> Chats</li>
              <li className={classes.menuItem}><img src='calender.svg'/> Calender</li>
            </ul>
            <ul className={classes.footer}>
              <li className={classes.menuItem}><img src='settings.svg'/> Settings</li>
              <li className={classes.menuItem} onClick={props.onLogout} ><img src='logout.svg'/> Log Out</li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navigation;
