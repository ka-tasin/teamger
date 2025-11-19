
import type { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import type { ICreateUser, ILoginUser } from '../interfaces/index';

export class UserController {
  private userService = new UserService();

  async register(req: Request, res: Response) {
    try {
      const userData: ICreateUser = req.body;
      const result = await this.userService.register(userData);

      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: ILoginUser = req.body;
      const result = await this.userService.login(loginData);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get profile'
      });
    }
  }
}