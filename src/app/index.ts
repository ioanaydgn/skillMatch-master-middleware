import express, { Application } from 'express';
import { departmentRouter, projectRouter, organizationRouter, skillRouter, customRoleRouter } from '@routes';

const app: Application = express();
import cors from 'cors';


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
app.use(`${version}/organization`, organizationRouter);
app.use(`${version}/skill`, skillRouter);
app.use(`${version}/roles`, customRoleRouter);
app.use(`${version}/team`, customRoleRouter);

export default app;