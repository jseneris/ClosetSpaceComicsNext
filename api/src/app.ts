import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { NotFoundError } from './errors/not-found-error';
import { currentUser } from './middlewares/current-user';

// import { catalogQueryRouter } from './routes/catalog/catalog';
import { catalogPublisherRouter } from './routes/catalog/publisher';
import { catalogTitleRouter } from './routes/catalog/title';
import { catalogIssueRouter } from './routes/catalog/issue';
import { catalogSingleIssueRouter } from './routes/catalog/single-issue';

import { collectionQueryRouter } from './routes/user/collection';
import { purchaseQueryRouter } from './routes/user/purchase';
import { purchaseItemQueryRouter } from './routes/user/purchaseitem';
import { currentUserRouter } from './routes/user/current-user';
import { locationQueryRouter } from './routes/user/location';
import { boxQueryRouter } from './routes/user/box';

const app = express();

app.use(cors());
app.use(json());

app.use(currentUser);

// app.use(catalogQueryRouter);
app.use(catalogPublisherRouter);
app.use(catalogTitleRouter);
app.use(catalogIssueRouter);
app.use(catalogSingleIssueRouter);

app.use(collectionQueryRouter);
app.use(purchaseQueryRouter);
app.use(purchaseItemQueryRouter);
app.use(locationQueryRouter);
app.use(boxQueryRouter);
app.use(currentUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

export { app };
