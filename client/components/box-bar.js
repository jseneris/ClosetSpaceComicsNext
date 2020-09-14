import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const keys = require('../../config/keys');

const useStyles = makeStyles((theme) => ({
  pubLogo: {
    backgroundColor: '#fff',
    border: '#fff',
    display: 'inline-block',
    height: '80px',
    verticalAlign: 'middle',
    margin: '5px',
    cursor: 'pointer',
    '& img': {
      maxHeight: '80px',
    },
  },
  filterList: {
    textAlign: 'center',
    paddingBottom: '10px',
    borderTop: '2px solid black',
    borderBottom: '2px solid black',
    marginBottom: '10px',
  },
  inactive: {
    backgroundColor: 'light-grey !important',
    opacity: 0.4,
  },
}));

export const BoxBar = (props) => {
  const classes = useStyles();

  const onBoxButtonClick = (box) => {
    props.UpdateBox(box);
  };

  const buttonBody = (box) => {
    return (
      <div>
        <img
          src={`${keys.azureCdnAddress}/box.jpg`}
          alt={box.name}
          title={box.name}
        />
        <p>{box.name}</p>
      </div>
    );
  };

  const boxList = () => {
    return props.Boxes.map((box) => {
      let filterState = box.id === props.ActiveBox;
      return (
        <button
          className={`${classes.pubLogo} ${
            filterState ? classes.inactive : ''
          }`}
          onClick={(e) => onBoxButtonClick(box)}
          key={box.id}
        >
          {buttonBody(box)}
        </button>
      );
    });
  };

  return <div className={classes.filterList}>{boxList()}</div>;
};
