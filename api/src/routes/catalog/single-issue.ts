import express, { Request, Response } from 'express';
import { Title } from '../../models/Title';
import { Issue } from '../../models/Issue';
import { Publisher } from '../../models/Publisher';

const router = express.Router();

router.get(
  '/api/catalog/:publisher/:title/:issue',
  async (req: Request, res: Response) => {
    const { publisher, title, issue } = req.params;

    const foundPublisher = await Publisher.findOne({
      seoFriendlyName: publisher,
    });

    if (foundPublisher) {
      const foundTitle = await Title.findOne({
        seoFriendlyName: title,
        publisher: foundPublisher,
      });

      if (foundTitle) {
        const foundIssue = await Issue.findOne({
          title: foundTitle,
          seoFriendlyName: issue,
        }).populate({
          path: 'title',
          select: 'name seoFriendlyName id publisher',
          populate: {
            path: 'publisher',
            select: 'name seoFriendlyName',
          },
        });

        const titleIssues = await Issue.find({
          title: foundTitle,
        }).select('seoFriendlyName imageUrl');

        res.send({ issue: foundIssue, titleList: titleIssues });
      }
    }

    res.send();
  }
);

export { router as catalogSingleIssueRouter };
