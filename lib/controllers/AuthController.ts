import { NextRequest } from 'next/server';
import { BaseController } from './BaseController';
import { AuthService } from '@/lib/services/AuthService';

export class AuthController extends BaseController {
    private authService: AuthService;

    constructor() {
        super();
        this.authService = new AuthService();
    }

    async register(req: NextRequest) {
        return this.handleRequest(async () => {
            const body = await this.parseBody(req);
            return this.authService.register(body);
        });
    }

    async login(req: NextRequest) {
        return this.handleRequest(async () => {
            const body = await this.parseBody(req);
            return this.authService.login(body);
        });
    }

    async me(req: NextRequest) {
        return this.handleRequest(async () => {
            const userId = this.getUserId(req);
            return this.authService.getProfile(userId);
        });
    }
}
