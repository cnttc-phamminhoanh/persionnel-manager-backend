import * as express from 'express';
import { UsersController } from './users.controller';
import { authenticateToken } from '../../middlewares/verifyJWTToken';

const router = express.Router();

const usersController = new UsersController()

router.get('/users', authenticateToken, usersController.getAllUser);

router.get('/users/:userId', usersController.getOneUser);

router.put('/users/:userId', usersController.updateOneUser);

router.delete('/users/:userId', usersController.deleteOneUser);

export default router;