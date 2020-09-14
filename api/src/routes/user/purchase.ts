import express, { Request, Response } from 'express';
import { Issue } from '../../models/Issue';
import { Purchase } from '../../models/Purchase';
import { PurchaseItem } from '../../models/PurchaseItem';
import mongoose from 'mongoose';
import { User } from '../../models/User';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/user/purchase',
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser!.id);

    if (user) {
      const purchases = await Purchase.find({
        user,
      })
        .populate({
          path: 'items',
          select: 'issue',
          populate: {
            path: 'issue',
            select: 'id imageUrl seoFriendlyName title',
            populate: {
              path: 'title',
              select: 'name',
            },
          },
        })
        .limit(10);

      res.send({ purchases });
    }
  }
);

router.get(
  '/api/user/purchase/migrate',
  async (req: Request, res: Response) => {
    const purchases = await Purchase.find({ items: { $exists: false } }).limit(
      100
    );

    if (purchases) {
      purchases.forEach(async (purchase) => {
        const items = await PurchaseItem.find({ purchase });
        purchase.set({ items: items });
        await purchase.save();
      });
    }

    res.send(purchases);
  }
);

router.get('/api/user/purchase/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    const purchase = await Purchase.findById(id).populate({
      path: 'items',
      populate: {
        path: 'title',
        //        select: 'id name',
      },
    });
    res.send(purchase);
  }
});

export { router as purchaseQueryRouter };
