import { Request, Response } from "express";
import { UserService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { errorHandler } from "../../utils/errorHandler";

export class AuthController {
  static userService: UserService;

  constructor() {
    AuthController.userService = new UserService(); 
  }

  async signUpWithAuth0(req: Request, res: Response) {
    try {
      const { password } = req.body;

      const hasPassword = await bcrypt.hash(password, Number(process.env.BCRYPTSALT));

      const newUser = {
        ...req.body,
        password: hasPassword,
        oldPasswords: hasPassword,
      }

      await AuthController.userService.createOneUser(newUser)

      const token = jwt.sign({ ...newUser }, process.env.ACCESS_TOKEN_SECRET);

      return res.json({ token });
    } catch (error) {
      console.log('signUpWithAuth0 - error', error);

      return errorHandler(error, res);
    }
  }

  async loginWithAuth0(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await AuthController.userService.findOneUser({
        query: { email },
        checkExist: false,
      })

      const comparePassword = await bcrypt.compare(password, user?.password ?? ' ');

      if (!user || !comparePassword) {
        throw {
          code: 401,
          message: 'Invalid email or password',
        };
      }

      const token = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET);

      return res.json({ token });
    } catch (error) {
      console.log('loginWithAuth0 - error', error);

      return errorHandler(error, res);
    }
  }
}
