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

export const FilterBar = (props) => {
  const classes = useStyles();

  const onFilterButtonClick = (key) => {
    if (props.ActiveFilters.includes(key)) {
      props.UpdateActiveFilter(props.ActiveFilters.filter((x) => x != key));
    } else {
      props.ActiveFilters.push(key);
      props.UpdateActiveFilter(props.ActiveFilters);
    }
  };

  const buttonBody = (filter) => {
    if (filter.imageName) {
      return (
        <img
          src={`${keys.azureCdnAddress}/publishers/${filter.imageName}`}
          alt={filter.name}
          title={filter.name}
        />
      );
    } else {
      return <span>{filter.name}</span>;
    }
  };

  const filterList = () => {
    return props.Filters.map((filter) => {
      let filterState = false;
      if (props.ActiveFilters.length > 0) {
        if (props.ActiveFilters.indexOf(filter.id) === -1) {
          filterState = true;
        }
      }
      return (
        <button
          className={`${classes.pubLogo} ${
            filterState ? classes.inactive : ''
          }`}
          onClick={(e) => onFilterButtonClick(filter.id)}
          key={filter.id}
        >
          {buttonBody(filter)}
        </button>
      );
    });
  };

  return <div className={classes.filterList}>{filterList()}</div>;
};
