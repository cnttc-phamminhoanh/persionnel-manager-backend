import { Request, Response } from "express";
import { UserService } from './users.service'
import { errorHandler } from "../../utils/errorHandler";

export class UsersController {
  static userService: UserService;

  constructor() {
    UsersController.userService = new UserService(); 
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const query = req.query;

      const users = await UsersController.userService.findManyUser(query);

      return res.json(users)
    } catch (error) {
      console.log('getAllUser - error', error);

      return errorHandler(error, res);
    }
  }

  async getOneUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await UsersController.userService.findOneUser({
        query: {
          userId,
        },
      });

      delete user.password;

      return res.json(user)
    } catch (error) {
      console.log('getOneUser - error', error);

      return errorHandler(error, res);
    }
  }

  async updateOneUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const data = req.body;

      await UsersController.userService.updateOneUser({
        query: {
          userId
        },
        data,
      });

      return res.json({
        success: true,
      });
    } catch (error) {
      console.log('updateOneUser - error', error);

      return errorHandler(error, res);
    }
  }

  async deleteOneUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      await UsersController.userService.deleteOneUser({
        query: {
          userId,
        },
      });

      return res.json({
        success: true,
      });
    } catch (error) {
      console.log('deleteOneUser - error', error);

      return errorHandler(error, res);
    }
  }
}
