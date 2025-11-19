import { UserService } from '../services/user.services';
export class UserController {
    userService = new UserService();
    async register(req, res) {
        try {
            const userData = req.body;
            const result = await this.userService.register(userData);
            res.status(201).json({
                success: true,
                data: result
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Registration failed'
            });
        }
    }
    async login(req, res) {
        try {
            const loginData = req.body;
            const result = await this.userService.login(loginData);
            res.json({
                success: true,
                data: result
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                error: error instanceof Error ? error.message : 'Login failed'
            });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.user.userId;
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get profile'
            });
        }
    }
}
//# sourceMappingURL=user.controller.js.map