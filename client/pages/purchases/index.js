import { useEffect, useState } from 'react';
import axios from 'axios';
// const keys = require('../../config/keys');

import { PurchaseBar } from '../../components/purchase-bar';
import { PurchaseIssueList } from '../../components/purchase-item-list';

const PurchaseIndex = ({ currentUser, purchases }) => {
  const [currentPurchases, setPurchaseList] = useState(purchases);
  const [selectedPurchase, setPurchase] = useState(purchases[0]);
  const [issues, setIssues] = useState(selectedPurchase.items);

  const handlePurchaseChange = (purchase) => {
    setIssues([]);
    setPurchase(purchase);
    setIssues(purchase.items);
  };

  return (
    <div>
      <div>
        <h1>Purchases</h1>
        <PurchaseBar
          Purchases={currentPurchases}
          UpdatePurchase={handlePurchaseChange}
          ActivePurchase={selectedPurchase}
        ></PurchaseBar>
      </div>
      <div>
        <h1>Issues</h1>
        <PurchaseIssueList Issues={issues}></PurchaseIssueList>
      </div>
    </div>
  );
};
PurchaseIndex.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get(`api/user/purchase`);
  return { purchases: data.purchases };
};

export default PurchaseIndex;
