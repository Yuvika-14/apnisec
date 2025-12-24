import { IssueController } from '@/lib/controllers/IssueController';

const controller = new IssueController();

export async function GET(req: Request, context: any) {
    return controller.get(req as any, context);
}

export async function PUT(req: Request, context: any) {
    return controller.update(req as any, context);
}

export async function DELETE(req: Request, context: any) {
    return controller.delete(req as any, context);
}
