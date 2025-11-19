import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
export class UserService {
    userRepository = new UserRepository();
    async register(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        const user = await this.userRepository.create({
            ...userData,
            password: hashedPassword
        });
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    async login(loginData) {
        const user = await this.userRepository.findByEmail(loginData.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isValidPassword = await bcrypt.compare(loginData.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    async getUserById(id) {
        return this.userRepository.findById(id);
    }
}
//# sourceMappingURL=user.services.js.map