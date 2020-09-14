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

export const LocationBar = (props) => {
  const classes = useStyles();

  const onLocationButtonClick = (location) => {
    props.UpdateLocation(location);
  };

  const buttonBody = (location) => {
    return (
      <div>
        <img
          src={`${keys.azureCdnAddress}/location.jpg`}
          alt={location.name}
          title={location.name}
        />
        <p>{location.name}</p>
      </div>
    );
  };

  const locationList = () => {
    return props.Locations.map((location) => {
      let filterState = location.id === props.ActiveLocation;
      return (
        <button
          className={`${classes.pubLogo} ${
            filterState ? classes.inactive : ''
          }`}
          onClick={(e) => onLocationButtonClick(location)}
          key={location.id}
        >
          {buttonBody(location)}
        </button>
      );
    });
  };

  return <div className={classes.filterList}>{locationList()}</div>;
};
