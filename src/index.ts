import { myDataSource } from './data-source';
import * as express from 'express';
import { type Request, type Response } from 'express';
import { Users } from './entity/Users';

myDataSource
	.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err) => {
		console.error('Error during Data Source initialization:', err);
	});

const app = express();

app.use(express.json());

app.get('/users', async function (req: Request, res: Response) {
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

