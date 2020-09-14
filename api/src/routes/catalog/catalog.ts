import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { Publisher } from '../../models/Publisher';
import { Title } from '../../models/Title';
import { Issue } from '../../models/Issue';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/catalog/:publisher/:title/:issue',
  async (req: Request, res: Response) => {
    const { publisher, title, issue } = req.params;

    res.send(null);
  }
);

export { router as catalogQueryRouter };
