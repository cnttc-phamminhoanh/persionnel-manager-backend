import * as express from 'express';
import userRouter from './domains/users/users.router'
import authRouter from './domains/auth/auth.router'
import dataSource from './database/dataSource';

const app = express();

app.use(express.json());

app.use(authRouter);

app.use(userRouter);

app.listen(3000);

console.log('server is running on port 3000');

(async () => {
  await dataSource.initialize();

  console.log('connected to database')
})();
