import express, { Application } from 'express';
import { departmentRouter, projectRouter, organizationRouter, skillRouter, customRoleRouter, teamRouter } from '@routes';

const app: Application = express();
import cors from 'cors';


app.use(express.json());
app.use(cors());


// redirect to my site ^.^
app.get('/', (_, res) => {
  res.redirect('https://aydgn.me');
});

const version = '/v1';

app.use(`${version}/department`, departmentRouter);
app.use(`${version}/project`, projectRouter);
app.use(`${version}/organization`, organizationRouter);
app.use(`${version}/skill`, skillRouter);
app.use(`${version}/roles`, customRoleRouter);
app.use(`${version}/team`, teamRouter);

export default app;