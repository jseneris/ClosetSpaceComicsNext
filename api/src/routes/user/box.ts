import express, { Request, Response } from 'express';
import { Issue } from '../../models/Issue';
import { Location } from '../../models/Location';
import { Box } from '../../models/Box';
import { PurchaseItem } from '../../models/PurchaseItem';
import mongoose from 'mongoose';
import { User } from '../../models/User';

const router = express.Router();

router.get('/api/user/box', async (req: Request, res: Response) => {
  const user = await User.findById('5f1f7bd82caa9613dcdbedfb');

  if (user) {
    const boxes = await Box.find({
      user,
    }).limit(10);

    res.send(boxes);
  }
});

router.get('/api/user/box/migrate', async (req: Request, res: Response) => {
  const boxes = await Box.find({ items: { $exists: false } }).limit(100);

  if (boxes) {
    boxes.forEach(async (box) => {
      const items = await PurchaseItem.find({ box });
      box.set({ items });
      await box.save();
    });
  }

  res.send(boxes);
});

router.get('/api/user/box/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    const box = await Box.findById(id).populate({
      path: 'items',
    });
    res.send(box);
  }
});

export { router as boxQueryRouter };
