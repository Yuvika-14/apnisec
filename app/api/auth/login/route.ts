import { AuthController } from '@/lib/controllers/AuthController';

const controller = new AuthController();

export async function POST(req: Request) {
    return controller.login(req as any);
}
