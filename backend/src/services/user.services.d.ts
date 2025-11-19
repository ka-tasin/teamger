import type { IUser, ICreateUser, ILoginUser } from '../interfaces';
export declare class UserService {
    private userRepository;
    register(userData: ICreateUser): Promise<{
        user: IUser;
        token: string;
    }>;
    login(loginData: ILoginUser): Promise<{
        user: IUser;
        token: string;
    }>;
    getUserById(id: string): Promise<IUser | null>;
}
//# sourceMappingURL=user.services.d.ts.map