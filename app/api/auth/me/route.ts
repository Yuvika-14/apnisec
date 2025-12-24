// For Protected Routes, we need to ensure verifyToken is called.
// BaseController can extract ID from verified token.
// But we need to call verifiedToken logic before extracting ID.
// I will update BaseController to verify token if `getUserId` is called.

import { AuthController } from '@/lib/controllers/AuthController';

const controller = new AuthController();

export async function GET(req: Request) {
    return controller.me(req as any);
}
