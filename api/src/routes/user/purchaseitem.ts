import express, { Request, Response } from 'express';
import { Issue } from '../../models/Issue';
import { Purchase } from '../../models/Purchase';
import { PurchaseItem } from '../../models/PurchaseItem';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/user/purchaseitem/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const purchaseItem = await PurchaseItem.findById(id).populate('title');
    res.send(purchaseItem);
  }
);

// router.get(
//   '/api/user/purchaseitem/:id',
//   async (req: Request, res: Response) => {
//     const { id } = req.params;

//     console.log(id);
//     const purchase = await Purchase.findById(id);
//     if (purchase) {
//       const items = await PurchaseItem.find({
//         purchase,
//       });

//       res.send(items);
//     }
//   }
// );

export { router as purchaseItemQueryRouter };
