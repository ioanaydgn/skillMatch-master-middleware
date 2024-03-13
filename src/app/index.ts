import express, { Application } from 'express';
import { departmentRouter, projectRouter, organizationRouter } from '@routes';

const app: Application = express();
import cors from 'cors';

import { authApiKey, globalRateLimiter } from 'middlewares';
app.use(express.json());

app.use(cors());

// 60 requests per minute
//app.use(globalRateLimiter);

// redirect to notie.xyz
app.get('/', (_, res) => {
  res.redirect('https://notie.xyz');
});

const version = '/v1';

app.use(`${version}/department`, departmentRouter);
app.use(`${version}/project`, projectRouter);
app.use(`${version}/`, organizationRouter);

export default app;