import { NextRequest } from 'next/server';
import { BaseController } from './BaseController';
import { UserService } from '@/lib/services/UserService';

export class UserController extends BaseController {
    private userService: UserService;

    constructor() {
        super();
        this.userService = new UserService();
    }

    async getProfile(req: NextRequest) {
        return this.handleRequest(async () => {
            const userId = this.getUserId(req);
            return this.userService.getProfile(userId);
        });
    }

    async updateProfile(req: NextRequest) {
        return this.handleRequest(async () => {
            const userId = this.getUserId(req);
            const body = await this.parseBody(req);
            return this.userService.updateProfile(userId, body);
        });
    }
}
