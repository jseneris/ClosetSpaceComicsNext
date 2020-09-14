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

export const PurchaseBar = (props) => {
  const classes = useStyles();

  const onPurchaseButtonClick = (purchase) => {
    props.UpdatePurchase(purchase);
  };

  const buttonBody = (purchase) => {
    if (purchase.items[0].issue) {
      return (
        <div>
          <img
            src={purchase.items[0].issue.imageUrl}
            alt={purchase.description}
            title={purchase.description}
          />
          <p>{purchase.description}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>{purchase.description}</p>
        </div>
      );
    }
  };

  const purchaseList = () => {
    return props.Purchases.map((purchase) => {
      let filterState = purchase.id === props.ActivePurchase;
      return (
        <button
          className={`${classes.pubLogo} ${
            filterState ? classes.inactive : ''
          }`}
          onClick={(e) => onPurchaseButtonClick(purchase)}
          key={purchase.id}
        >
          {buttonBody(purchase)}
        </button>
      );
    });
  };

  return <div className={classes.filterList}>{purchaseList()}</div>;
};
