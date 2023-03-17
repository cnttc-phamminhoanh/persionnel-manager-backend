import { connectDB, myDataSource } from './data-source';
import * as express from 'express';
import { type Request, type Response } from 'express';
import { Users } from './entity/Users';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'my_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/signUp', async function (req: Request, res: Response) {
  const { password } = req.body;

  const hasPassword = await bcrypt.hash(password, Number(process.env.BCRYPTSALT));

  const newUser = {
    ...req.body,
    password: hasPassword,
    oldPasswords: hasPassword,
  };

  const user = await myDataSource.getRepository(Users).create(newUser);

	const results = await myDataSource.getRepository(Users).save(user);

  return res.send(results);
});

app.post('/login', async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await myDataSource.getRepository(Users).findOne({
      where: { email }
    });

    const comparePassword = await bcrypt.compare(password, user?.password ?? ' ');

    if (!user || !comparePassword) {
      throw {
        statusCode: 401,
        message: 'Invalid email or password',
      };
    }

    const token = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(401).json(error);
  }
});

app.get('/users', authenticateToken, async function (req: Request, res: Response) {
	const users = await myDataSource.getRepository(Users).find();

	res.json(users);
});

app.get('/users/:id', async function (req: Request, res: Response) {
	const userId = req.params.id as any;

	const results = await myDataSource.getRepository(Users).findOneBy({ userId });

	return res.send(results);
});

app.post('/users', async function (req: Request, res: Response) {
	const user = await myDataSource.getRepository(Users).create(req.body);

	const results= await myDataSource.getRepository(Users).save(user);

	return res.send(results);
});

app.put('/users/:id', async function (req: Request, res: Response) {
	const userId = req.params.id as any;

	const user = await myDataSource.getRepository(Users).findOneBy({ userId });

	myDataSource.getRepository(Users).merge(user, req.body);

	const results=await myDataSource.getRepository(Users).save(user);

	return res.send(results);
});

app.delete('/users/:id', async function (req:Request, res: Response) {
	const results = await myDataSource.getRepository(Users).delete(req.params.id);

	return res.send(results);
});

app.listen(3000);

console.log('server is running on port 3000');

