import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { Publisher } from '../../models/Publisher';
import { Issue } from '../../models/Issue';

const router = express.Router();

router.get(
  '/api/catalog/issue',
  currentUser,
  async (req: Request, res: Response) => {
    let { date, title } = req.query;
    let filter = {};
    if (date) {
      const filterDate = new Date(date.toString());
      const origDate = new Date(date.toString());
      filterDate.setDate(filterDate.getDate() - 7);
      filter = {
        releaseDate: {
          $lte: origDate,
          $gte: filterDate,
        },
      };
    }
    const issues = await Issue.find(filter)
      .populate({
        path: 'title',
        select: 'name seoFriendlyName id publisher',
        populate: {
          path: 'publisher',
          select: 'name seoFriendlyName',
        },
      })
      .select('seoFriendlyName imageUrl')
      .limit(100);

    const publishers = await Publisher.find({
      _id: { $in: issues.map((issue) => issue.title.publisher) },
    }).select('name imageName id');
    res.send({ issues, publishers });
  }
);

export { router as catalogIssueRouter };
