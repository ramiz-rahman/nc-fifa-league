import React from 'react';
import classes from './SubmitButton.module.css';

const submitButton = props => {
  return (
    <button type="submit" className={classes.SubmitButton}>
      {props.children}
    </button>
  );
};

export default submitButton;
