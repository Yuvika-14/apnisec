import { UserController } from '@/lib/controllers/UserController';

const controller = new UserController();

export async function GET(req: Request) {
    return controller.getProfile(req as any);
}

export async function PUT(req: Request) {
    return controller.updateProfile(req as any);
}
