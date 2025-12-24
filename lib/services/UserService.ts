import { UserRepository } from '@/lib/repositories/UserRepository';
import { AppError } from '@/lib/core/AppError';

export class UserService {
    private userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    async getProfile(userId: string) {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw AppError.notFound('User not found');
        }
        const { password, ...rest } = user;
        return rest;
    }

    async updateProfile(userId: string, data: { name?: string }) {
        // Simple validation
        if (data.name && data.name.length < 2) {
            throw AppError.badRequest('Name must be at least 2 characters');
        }

        const user = await this.userRepo.update(userId, data);
        const { password, ...rest } = user;
        return rest;
    }
}
