import express, { Request, Response } from 'express';
import { Issue } from '../../models/Issue';
import { Location } from '../../models/Location';
import { Box } from '../../models/Box';
import { PurchaseItem } from '../../models/PurchaseItem';
import mongoose from 'mongoose';
import { User } from '../../models/User';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/user/location',
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser!.id);

    if (user) {
      const locations = await Location.find({
        user,
      }).populate({
        path: 'boxes',
        select: 'name order id',
      });

      res.send({ locations });
    }
  }
);

router.get(
  '/api/user/location/migrate',
  async (req: Request, res: Response) => {
    const locations = await Location.find({ boxes: { $exists: false } }).limit(
      100
    );

    if (locations) {
      locations.forEach(async (location) => {
        const boxes = await Box.find({ location });
        location.set({ boxes });
        await location.save();
      });
    }

    res.send(locations);
  }
);

router.get('/api/user/location/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    const location = await Location.findById(id).populate({
      path: 'boxes',
    });
    res.send(location);
  }
});

export { router as locationQueryRouter };
