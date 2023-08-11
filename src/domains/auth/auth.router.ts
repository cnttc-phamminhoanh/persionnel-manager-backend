import * as express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

const authController = new AuthController();

router.post('/auth/signUp', authController.signUpWithAuth0);

router.post('/auth/login', authController.loginWithAuth0);

export default router;