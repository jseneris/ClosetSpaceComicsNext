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
  '/api/user/collection',
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
  '/api/user/collection/:locationName/:boxName',
  requireAuth,
  async (req: Request, res: Response) => {
    const { locationName, boxName } = req.params;

    const user = await User.findById(req.currentUser!.id);

    if (user) {
      const location = await Location.findOne({
        name: locationName,
        user: user,
      });

      if (location) {
        const box = await Box.findOne({
          name: boxName,
          location: location,
        }).populate({
          path: 'items',
          populate: {
            path: 'issue',
            select: 'id imageUrl seoFriendlyName',
          },
          // populate: {
          //   path: 'title',
          //   select: 'seoFriendlyName'
          // }
        });

        if (box) {
          res.send({ items: box.items });
        }
      }
    }

    // if (id) {
    //   const box = await Box.findById(id).populate({
    //     path: 'items',
    //   });
    //   res.send(box);
    // }
  }
);

export { router as collectionQueryRouter };
