import React from 'react';
import classes from './PlayerStatsTable.module.css';

const playerStatsTable = props => (
  <div className={classes.PlayerStatsTable}>
    <ul>
      <li>
        <strong>MP:</strong> {props.mp}
      </li>
      <li>
        <strong>W:</strong> {props.w}
      </li>
      <li>
        <strong>L:</strong> {props.l}
      </li>
      <li>
        <strong>D:</strong> {props.d}
      </li>
      <li>
        <strong>Pts:</strong> {props.l}
      </li>
      <li>
        <strong>GF:</strong> {props.gf}
      </li>
      <li>
        <strong>GA:</strong> {props.ga}
      </li>
      <li>
        <strong>GD:</strong> {props.gd}
      </li>
    </ul>
  </div>
);

export default playerStatsTable;
